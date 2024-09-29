import axiosInstance from "../../services/axiosInstance.ts";

export interface ProjectPayloadData {
  githubUsername: string;
  environmentId: string | undefined;
  name: string;
  haveBackEnd: boolean | undefined;
  githubEmail: string;
}

export const createProjectRequest = async (payload: ProjectPayloadData): Promise<void> => {
  try {
    await axiosInstance.post("/projects", payload);
  } catch (error) {
    throw error;
  }
};
