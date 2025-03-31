import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function extractTextFromResume(fileBuffer: Buffer, fileType: string): Promise<string> {
  // Implement the extraction logic based on file type
  // This is a placeholder and should be implemented with actual file parsing
  return Promise.resolve("Sample resume text");
}

export async function tailorResume(resumeText: string, jobDescription: string): Promise<string> {
  // Placeholder for resume tailoring logic
  // In a real implementation, this would use NLP or AI to match resume to job description
  return Promise.resolve(resumeText);
}

export async function generateCoverLetter(resumeText: string, jobDescription: string): Promise<string> {
  // Placeholder for cover letter generation
  // In a real implementation, this would use OpenAI API or similar
  return Promise.resolve("Sample cover letter");
} 