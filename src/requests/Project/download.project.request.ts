import axiosInstance from "../../services/axiosInstance.ts";

export const downloadProjectRequest = async (projectName: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(`projects/download`, { projectName }, { responseType: "blob" });

    const blob = new Blob([response.data], { type: "application/zip" });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${projectName}.zip`;
    link.click();

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading the project:", error);
  }
};
