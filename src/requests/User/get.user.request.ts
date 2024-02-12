import axiosInstance from '../../services/axiosInstance.ts';

export interface UserData {
    id: number,
    name: string,
    email: string
}

export const getUserRequest = async (): Promise<UserData> => {
    try {
        const response = await axiosInstance.get('/auth/user');
        return response.data.user;
    } catch (error) {
        throw error;
    }
};