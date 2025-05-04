import { validateAndToast } from "@/lib/validate-toast";
import { useRef, useState } from "react";
import { useAxiosWithAuth } from "./useAxiosWithAuth";
import { toast } from "sonner";

export const usePdfUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosWithAuth = useAxiosWithAuth();

  const handlePdfUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (validateAndToast(file, e.target)) {
      setSelectedFile(file);
    }

    e.target.value = "";
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
      setSelectedFile(file);
    }
  };

  const handleFileUploadToCloud = async () => {
    const loadingSonnerId = toast.loading("File is uploading...");
    setIsLoading(true);
    try {
      if (!selectedFile) {
        toast.error("No file selected!");
        return;
      }

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await axiosWithAuth.post<{
        success: boolean;
        message: string;
      }>("/upload/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("File uploading failed !");
      }
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.dismiss(loadingSonnerId);
    }
  };

  return {
    fileInputRef,
    isDragActive,
    handlePdfUpload,
    handleFileChange,
    handleDrop,
    handleDragLeave,
    handleDragOver,
    handleFileUploadToCloud,
    isLoading,
    selectedFile,
  };
};
