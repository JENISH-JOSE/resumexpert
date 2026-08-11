import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";
import tesseract from "node-tesseract-ocr";
import fs from "fs/promises";
import os from "os";
import path from "path";
import sharp from "sharp";

export async function extractResumeText(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  switch (extension) {
    case "pdf":
      return extractPdfText(file);

    case "docx":
      return extractDocxText(file);

    case "txt":
      return extractTextFile(file);

    case "jpg":
    case "jpeg":
    case "png":
      return extractImageText(file);

    default:
      throw new Error("Unsupported file format");
  }
}

async function extractPdfText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Try extracting text normally first
  try {
    const parsed = await pdfParse(buffer);

    if (parsed.text && parsed.text.trim().length > 30) {
      console.log("✅ Text PDF detected.");
      return parsed.text.trim();
    }

    console.log("📄 Scanned PDF detected. Using OCR...");
  } catch {
    console.log("⚠ PDF parsing failed. Using OCR...");
  }

  throw new Error("Scanned PDF is not supported. Please upload the original PDF, DOCX, or a JPG/PNG image of your resume.");
}


async function extractDocxText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await mammoth.extractRawText({
    buffer,
  });

  return result.value?.trim() ?? "";
}

async function extractTextFile(file: File): Promise<string> {
  return file.text();
}

async function extractImageText(file: File): Promise<string> {
  const imageBuffer = Buffer.from(await file.arrayBuffer());

  const tempFile = path.join(
    os.tmpdir(),
    `resume-${Date.now()}.png`
  );

  try {
    await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .png()
      .toFile(tempFile);

    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };

    const text = await tesseract.recognize(tempFile, config);

    console.log("========== OCR TEXT ==========");
    console.log(text);
    console.log("==============================");

    return text.trim();
  } finally {
    try {
      await fs.unlink(tempFile);
    } catch { }
  }
}