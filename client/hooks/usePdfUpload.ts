import { validateAndToast } from "@/lib/validate-toast";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const usePdfUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handlePdfUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (validateAndToast(file, e.target)) {
      setUploadedFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (validateAndToast(file)) {
      setUploadedFileName(file.name);
    }
  };

  const handleFileUploadToCloud = () => {
    toast.loading("file is upload");
  };

  return {
    fileInputRef,
    isDragActive,
    uploadedFileName,
    handlePdfUpload,
    handleFileChange,
    handleDrop,
    handleDragLeave,
    handleDragOver,
    handleFileUploadToCloud,
  };
};
