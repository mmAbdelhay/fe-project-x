import axiosInstance from "../../services/axiosInstance.ts";
import { ProjectData } from "./get.projects.request.ts";

export const getProjectsByTagRequest = async (tag: string): Promise<ProjectData[]> => {
  const response = await axiosInstance.get(`/projects/tag/${tag}`);
  return response.data?.data;
};
