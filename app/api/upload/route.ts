import { extractResumeText } from "@/lib/resumeExtractor";
import { NextRequest, NextResponse } from "next/server";

const AI_UNAVAILABLE_MESSAGE =
  "AI service is temporarily unavailable. Please try again in a few minutes.";

export async function POST(request: NextRequest) {
  try {
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