"use client";

import React, { useState } from 'react';
import { FileUpload } from '@/components/file-upload';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TemplateSelector } from '@/components/template-selector';
import { Loader2, Download, Copy, CheckCircle } from 'lucide-react';

type TemplateType = 'modern' | 'minimal' | 'professional';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  const [originalResume, setOriginalResume] = useState<string | null>(null);
  const [tailoredResume, setTailoredResume] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  
  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile);
  };
  
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };
  
  const handleProcessCV = async () => {
    if (!file || !jobDescription) {
      setError('Please upload a CV and enter a job description');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);
      
      const response = await fetch('/api/process-cv', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to process CV');
      }
      
      const data = await response.json();
      setOriginalResume(data.originalResume);
      setTailoredResume(data.tailoredResume);
      setCoverLetter(data.coverLetter);
    } catch (err) {
      setError('An error occurred while processing your CV');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCopyCoverLetter = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    }
  };
  
  const handleDownloadCV = () => {
    if (tailoredResume) {
      const blob = new Blob([tailoredResume], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tailored-cv.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">CV Modifier</h1>
        <p className="text-center text-gray-600 mb-8">
          Tailor your CV to match job descriptions and generate matching cover letters
        </p>
        
        {!tailoredResume ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upload Your CV</h2>
            <FileUpload 
              onFileAccepted={handleFileAccepted}
              acceptedFileTypes={[
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
                'text/html'
              ]}
            />
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Enter Job Description</h2>
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mt-4">
                {error}
              </div>
            )}
            
            <Button
              className="w-full mt-6"
              onClick={handleProcessCV}
              disabled={isProcessing || !file || !jobDescription}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process CV'
              )}
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tailored CV</h2>
                <Button onClick={handleDownloadCV} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </div>
              
              <TemplateSelector
                resumeContent={tailoredResume}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Cover Letter</h2>
                <Button 
                  onClick={handleCopyCoverLetter} 
                  variant="outline" 
                  className="flex items-center"
                >
                  {copiedToClipboard ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                    </>
                  )}
                </Button>
              </div>
              
              <div className="prose max-w-none">
                {coverLetter?.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setTailoredResume(null);
                  setCoverLetter(null);
                  setOriginalResume(null);
                }}
              >
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
