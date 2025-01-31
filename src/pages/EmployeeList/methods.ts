import axios from 'axios';
import { IEmployee, IUser,IClient } from '../../interfaces';

const BASE_URL = 'https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com';


// Fetch All Employees
export const getEmployees = async (): Promise<IEmployee[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/employees`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch a Single Employee by Email
export const getEmployee = async (email: string): Promise<IEmployee | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/employee/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/byEmail/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadEmployeeFile = async (file: File, rg: string): Promise<any> => {
    try {
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('rg', rg);
        
        const response = await axios.post(`${BASE_URL}/employee/upload`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log('Server Response Data:', error.response.data);
            console.log('Server Response Status:', error.response.status);
            console.log('Server Response Headers:', error.response.headers);
        } else if (error.request) {
            console.log('The request was made but no response was received', error.request);
        } else {
            console.log('Error', error.message);
        }
        throw new Error(`${error.message} from uploadEmployeeFile`);
    }
};

export const getUsers = async (): Promise<IClient[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/user/get`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteUser = async (email: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/user/remove/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
