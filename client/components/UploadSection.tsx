"use client";

import { Button } from "./ui/button";
import { CloudUpload } from "lucide-react";
import { Input } from "./ui/input";
import { usePdfUpload } from "@/hooks/usePdfUpload";

const UploadSection: React.FC = () => {
  const {
    fileInputRef,
    isDragActive,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileChange,
    handlePdfUpload,
    handleFileUploadToCloud,
    isLoading,
    selectedFile,
  } = usePdfUpload();

  return (
    <section
      className={`border-2 border-dashed border-border rounded-lg h-full flex justify-center items-center transition-colors hover:bg-muted ${
        isDragActive ? "bg-muted" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col gap-6 justify-center items-center p-10">
        <CloudUpload className="w-16 h-16 mb-2 text-foreground" />
        <Input
          ref={fileInputRef}
          className="hidden"
          name="pdf-file"
          accept=".pdf,application/pdf"
          type="file"
          onChange={handleFileChange}
        />
        {selectedFile && selectedFile.name ? (
          <h2 className="text-lg font-semibold mb-1 text-foreground">
            {selectedFile.name}
          </h2>
        ) : (
          <h2 className="text-lg font-semibold mb-1 text-foreground">
            Drag & drop your PDF here
          </h2>
        )}
        <span className="text-sm text-muted-foreground mb-4">or</span>
        {selectedFile ? (
          <Button
            disabled={isLoading}
            variant="outline"
            className="px-6 py-2 text-base disabled:cursor-not-allowed"
            onClick={handleFileUploadToCloud}
          >
            Upload PDF
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            variant="outline"
            className="px-6 py-2 text-base disabled:cursor-not-allowed"
            onClick={handlePdfUpload}
          >
            Select PDF
          </Button>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
