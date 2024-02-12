import axiosInstance from '../../services/axiosInstance.ts';

interface UserData {
    message: string,
    token: string
}

interface PayloadInterface {
    email: string,
    password: string
}

export const LoginRequest = async (payload: PayloadInterface): Promise<UserData> => {
    try {
        const response = await axiosInstance.post('/auth/login', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};