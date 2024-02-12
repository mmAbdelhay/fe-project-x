import axiosInstance from '../../services/axiosInstance.ts';

export interface EnvironmentData {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

export const getEnvironmentRequest = async (): Promise<EnvironmentData[]> => {
    try {
        const response = await axiosInstance.get('/environments');
        return response.data?.data;
    } catch (error) {
        throw error;
    }
};