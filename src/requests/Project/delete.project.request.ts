import axiosInstance from '../../services/axiosInstance.ts';


export const deleteProjectRequest = async (projectId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`/projects/${projectId}/delete`);
        return true
    } catch (error) {
        throw error;
    }
};