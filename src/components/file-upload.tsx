import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileAccepted: (file: File) => void;
  acceptedFileTypes: string[];
}

export function FileUpload({ onFileAccepted, acceptedFileTypes }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileAccepted(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${isDragReject ? 'border-red-500 bg-red-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          {fileName ? (
            <>
              <File className="h-10 w-10 text-blue-600" />
              <p className="font-medium text-gray-700">{fileName}</p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setFileName(null);
                }}
              >
                Change file
              </Button>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-lg font-medium text-gray-700">
                {isDragActive ? "Drop your CV here" : "Drag your CV here or click to browse"}
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, DOCX, TXT, HTML
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 