import axios from 'axios';
import { IEmployee,IEmployeeData } from '../../interfaces';

const BASE_URL = 'https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com';

// Create an Employee
export const createEmployee = async (IEmployeeData: IEmployee) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/create`, IEmployeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

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

// Update an Employee by RG (I noticed the Express route uses email, but the service method uses RG. I'll go with email, as that's what the route suggests.)
export const updateEmployee = async (email: string, updatedData: IEmployee): Promise<void> => {
    try {
        await axios.patch(`${BASE_URL}/employee/update/${email}`, updatedData);
    } catch (error) {
        throw error;
    }
};

// Delete an Employee by Email
export const deleteEmployee = async (email: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/employee/delete/${email}`);
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


