declare module "pdf-parse/lib/pdf-parse.js" {
  import { DataOptions } from "pdf-parse";

  export interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: Record<string, unknown> | null;
    metadata: Record<string, unknown> | null;
    text: string;
    version: string;
  }

  export default function pdfParse(
    data: Buffer,
    options?: DataOptions
  ): Promise<PDFParseResult>;
}
