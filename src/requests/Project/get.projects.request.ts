import axiosInstance from '../../services/axiosInstance.ts';
import {EnvironmentData} from "../Environment/get.environments.request.ts";

export interface ProjectData {
    id: number
    githubUsername: string;
    environmentId: number | undefined;
    name: string;
    haveBackEnd: boolean;
    githubEmail: string;
    Environment: EnvironmentData;
}

export const getProjectsRequest = async (): Promise<ProjectData[]> => {
    try {
        const response = await axiosInstance.get('/projects');
        return response.data?.data;
    } catch (error) {
        throw error;
    }
};