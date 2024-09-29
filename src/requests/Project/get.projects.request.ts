import axiosInstance from "../../services/axiosInstance.ts";

export interface ProjectData {
  id: number;
  description: string;
  name: string;
  size: number;
  created_at: string;
  full_name: string;
  html_url: string;
}

export const getProjectsRequest = async (): Promise<ProjectData[]> => {
  const response = await axiosInstance.get("/projects");
  return response.data?.data;
};
