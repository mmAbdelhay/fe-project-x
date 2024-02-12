import axiosInstance from '../../services/axiosInstance.ts';

interface UserData {
    // Define your user data structure
}

interface PayloadInterface {
    email: string,
    password: string,
    name: string
}

export const RegisterRequest = async (payload: PayloadInterface): Promise<UserData> => {
    try {
        const response = await axiosInstance.post('/auth/register', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};