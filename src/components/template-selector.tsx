import React from 'react';
import { ModernTemplate } from './cv-templates/modern-template';
import { MinimalTemplate } from './cv-templates/minimal-template';
import { ProfessionalTemplate } from './cv-templates/professional-template';

type TemplateType = 'modern' | 'minimal' | 'professional';

interface TemplateSelectorProps {
  resumeContent: string;
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

export function TemplateSelector({ 
  resumeContent, 
  selectedTemplate,
  onSelectTemplate
}: TemplateSelectorProps) {
  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'professional', name: 'Professional' },
  ];

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate resumeContent={resumeContent} />;
      case 'minimal':
        return <MinimalTemplate resumeContent={resumeContent} />;
      case 'professional':
        return <ProfessionalTemplate resumeContent={resumeContent} />;
      default:
        return <ModernTemplate resumeContent={resumeContent} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center space-x-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id as TemplateType)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedTemplate === template.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-gray-50 p-4">
        {renderSelectedTemplate()}
      </div>
    </div>
  );
} 