import axiosInstance from "../../services/axiosInstance.ts";

export const getReadmeFileRequest = async (repo: string): Promise<string> => {
  const response = await axiosInstance.get(`/projects/${repo}/readme`);
  return response.data?.data.length > 0 ? formatText(response.data?.data) : "";
};

const formatText = (rawText: string) => {
  // Replace headings
  const formattedText = rawText
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
    // Replace lists
    .replace(/- (.*$)/gim, "<li>$1</li>")
    // Replace line breaks with paragraphs
    .replace(/(?:\r\n|\r|\n)/g, "<br/>");

  return formattedText;
};
