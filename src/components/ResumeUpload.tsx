import React from 'react';
import { Upload } from 'lucide-react';

interface ResumeUploadProps {
  onFileUpload: (file: File) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setSelectedFile(droppedFile);
      onFileUpload(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === 'application/pdf') {
      setSelectedFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  return (
    <div
      className={`border-4 border-dashed rounded-lg p-12 text-center transition-all
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h2 className="text-xl font-semibold mb-2">Drop your resume here</h2>
      <p className="text-gray-500 mb-4">or</p>
      <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
        Browse Files
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </label>
      <p className="mt-4 text-sm text-gray-500">Supported format: PDF</p>
      {selectedFile && (
        <div className="mt-4">
          <p className="text-gray-600 dark:text-gray-300">Selected file: {selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};