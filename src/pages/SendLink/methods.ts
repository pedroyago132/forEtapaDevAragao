import axios from 'axios';
import { IUser } from '../../interfaces'; // Adjust the path if you place the interface in a different location

const BASE_URL = 'https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com';

export const createUser = async (userData: IUser) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/create`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

