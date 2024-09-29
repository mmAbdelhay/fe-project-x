import axiosInstance from "../../services/axiosInstance.ts";

export const multipleProjectsdownloadRequest = async (projectNames: string[]): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      "/projects/download/multiple",
      { projectNames },
      { responseType: "blob" } // Set response type to blob for binary data
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "repositories.zip"); // Set the desired file name
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download the ZIP file:", error);
  }
};
