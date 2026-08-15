import { extractResumeText } from "@/lib/resumeExtractor";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const AI_UNAVAILABLE_MESSAGE =
  "AI service is temporarily unavailable. Please try again in a few minutes.";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(
      supabaseUrl,
      supabaseAnonKey,
      token
        ? {
            global: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          }
        : undefined
    );

    let userId: string | null = null;
    if (token) {
      const { data: userData } = await supabase.auth.getUser(token);
      userId = userData?.user?.id ?? null;
    }

    const formData = await request.formData();
    const file = formData.get("resume");
    const careerGoal = formData.get("careerGoal");

    if (!careerGoal || typeof careerGoal !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Please select your career goal before uploading your resume.",
        },
        {
          status: 400,
        }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    console.log("=================================");
    console.log("Uploaded File Name:", file.name);
    console.log("File Type:", file.type);
    console.log("File Size:", file.size, "bytes");
    console.log("=================================");

    const resumeText = await extractResumeText(file);

    console.log("=================================");
    console.log("Resume Length:", resumeText.length);
    console.log("Extracted Resume Text:");
    console.log(resumeText);
    console.log("=================================");

    if (!resumeText.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "No text could be extracted from the uploaded file.",
        },
        {
          status: 400,
        }
      );
    }

    const storageFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const storagePath = userId ? `${userId}/${storageFileName}` : storageFileName;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const { error: storageError } = await supabase.storage
      .from("resumes")
      .upload(storagePath, fileBuffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (storageError) {
      console.error("Storage upload error:", storageError);
    }

    const analyzeUrl = new URL("/api/analyze", request.url).toString();

    const analyzeResponse = await fetch(analyzeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        careerGoal,
      }),
    });

    type AnalyzeResponse = {
      success?: boolean;
      analysis?: unknown;
      error?: string;
      message?: string;
    };

    let analysis: AnalyzeResponse | null = null;

    try {
      analysis = (await analyzeResponse.json()) as AnalyzeResponse;
    } catch (parseError) {
      console.error("Failed to parse analyze response JSON:", parseError);
    }

    if (!analyzeResponse.ok || !analysis?.success || !analysis?.analysis) {
      return NextResponse.json(
        {
          success: false,
          error:
            analysis?.error ||
            analysis?.message ||
            AI_UNAVAILABLE_MESSAGE,
        },
        {
          status: analyzeResponse.status || 503,
        }
      );
    }

    return NextResponse.json({
      success: true,
      extractedText: resumeText,
      storagePath,
      analysis,
    });
  } catch (error) {
    console.error("Upload Route Error:", error);

    const errorMessage = error instanceof Error ? error.message : "";
    const isScannedPdf = errorMessage.includes("scanned document");

    return NextResponse.json(
      {
        success: false,
        error: isScannedPdf ? errorMessage : "Something went wrong",
      },
      {
        status: isScannedPdf ? 400 : 500,
      }
    );
  }
}