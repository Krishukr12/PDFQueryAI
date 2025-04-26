import { toast } from "sonner";

export const validateAndToast = (
  file: File,
  inputTarget?: HTMLInputElement,
) => {
  if (file.type !== "application/pdf") {
    toast("Only PDF files are allowed.");
    if (inputTarget) inputTarget.value = "";
    return false;
  }
  if (file.size > 25 * 1024 * 1024) {
    toast("File size must be less 25MB. ");
    if (inputTarget) inputTarget.value = "";
    return false;
  }
  toast(`File ${file.name} is ready to be uploaded !`);
  return true;
};
