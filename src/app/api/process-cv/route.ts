import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/mock-file-parser";
import { tailorResumeWithAI, generateCoverLetterWithAI } from "@/lib/ai-service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const jobDescription = formData.get('jobDescription') as string;
    
    if (!file || !jobDescription) {
      return NextResponse.json({ error: 'Missing file or job description' }, { status: 400 });
    }
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;
    
    // Extract text from file
    const resumeText = await extractTextFromFile(buffer, mimeType);
    
    // Tailor resume to job description using AI
    const tailoredResume = await tailorResumeWithAI(resumeText, jobDescription);
    
    // Generate cover letter
    const coverLetter = await generateCoverLetterWithAI(tailoredResume, jobDescription);
    
    return NextResponse.json({
      originalResume: resumeText,
      tailoredResume,
      coverLetter
    });
  } catch (error) {
    console.error('Error processing CV:', error);
    return NextResponse.json({ error: 'Failed to process CV' }, { status: 500 });
  }
} 