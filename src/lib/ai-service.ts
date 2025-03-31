// This is a mock implementation for demonstration purposes
// In a real app, you would use the OpenAI API with a valid API key

export async function tailorResumeWithAI(resumeText: string, jobDescription: string): Promise<string> {
  try {
    // For demo purposes, we'll just return a modified version of the resume
    // with some highlighted keywords from the job description
    const jobKeywords = extractKeywords(jobDescription);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return the "tailored" resume
    return `${resumeText}\n\nTailored for the following skills highlighted in the job description: ${jobKeywords.join(', ')}`;
  } catch (error) {
    console.error("Error tailoring resume:", error);
    throw new Error("Failed to tailor resume");
  }
}

export async function generateCoverLetterWithAI(resumeText: string, jobDescription: string): Promise<string> {
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, generate a simple cover letter template
    const jobTitle = extractJobTitle(jobDescription) || "the position";
    const company = extractCompany(jobDescription) || "your company";
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `${currentDate}\n\nDear Hiring Manager,\n\nI am writing to express my interest in ${jobTitle} at ${company}. After reviewing the job description, I believe my skills and experiences make me an excellent candidate for this role.\n\nThrough my previous experience, I have developed strong skills in problem-solving, teamwork, and communication. I am particularly adept at [skill from resume], which I understand is crucial for this position.\n\nI am excited about the opportunity to bring my unique skills to ${company} and help achieve your goals. I am particularly drawn to your company's mission and values, and I believe I would be a valuable addition to your team.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experiences would benefit your organization.\n\nSincerely,\n\nJohn Doe`;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
}

// Helper functions
function extractKeywords(text: string): string[] {
  // A simple implementation to extract potential keywords from the job description
  const commonSkills = [
    "javascript", "typescript", "react", "node", "nextjs", "html", "css",
    "python", "java", "c#", "sql", "mongodb", "aws", "azure", "docker",
    "kubernetes", "ci/cd", "agile", "scrum", "project management",
    "communication", "leadership", "teamwork", "problem-solving"
  ];
  
  const textLower = text.toLowerCase();
  return commonSkills.filter(skill => textLower.includes(skill.toLowerCase()));
}

function extractJobTitle(text: string): string | null {
  // Attempt to find the job title
  const jobTitleMatches = text.match(/(?:job title|position|role)[:|\s]+([^\n.]+)/i);
  return jobTitleMatches ? jobTitleMatches[1].trim() : null;
}

function extractCompany(text: string): string | null {
  // Attempt to find the company name
  const companyMatches = text.match(/(?:at|with|for|company)[:|\s]+([^\n.,]+)/i);
  return companyMatches ? companyMatches[1].trim() : null;
} 