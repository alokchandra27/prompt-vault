import API from "../api/AxiosConfig";
import { toast } from "react-toastify";

export const handlePromptExport = async (id, format, isPublic = false, title = "prompt") => {
  try {
    const accessType = isPublic ? "public" : "private";
    const endpoint = `/api/export/${accessType}/${id}/${format}`;

    toast.info(`Generating ${format.toUpperCase()} download...`);

    const response = await API.get(endpoint, {
      responseType: "blob",
      withCredentials: !isPublic, // Public ke liye credentials zaroori nahi, private ke liye chahiye
    });

    // Blob se file download trigger karna
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${title.replace(/\s+/g, '_')}.${format === "md" ? "md" : format}`;
    
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    toast.success("Downloaded successfully!");
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Failed to export prompt.");
  }
};