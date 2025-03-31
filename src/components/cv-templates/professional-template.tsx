import React from 'react';

interface CVTemplateProps {
  resumeContent: string;
}

export function ProfessionalTemplate({ resumeContent }: CVTemplateProps) {
  // In a real implementation, we would parse the resumeContent 
  // into structured data and display it in a formatted way
  const formattedContent = resumeContent.split('\n').map((line, index) => (
    <p key={index} className="mb-2">{line}</p>
  ));

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto font-serif">
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
        <h2 className="text-md font-medium text-gray-700">Software Engineer</h2>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
          <span>john.doe@example.com</span>
          <span>+1 (123) 456-7890</span>
          <span>San Francisco, CA</span>
        </div>
      </div>
      
      <div className="space-y-4 text-gray-800">
        {formattedContent}
      </div>
    </div>
  );
} 