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

export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/get`);
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

export const updateUser = async (email: string, updateData: Partial<IUser>) => {
    try {
        const response = await axios.patch(`${BASE_URL}/user/update/${email}`, updateData);
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

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const stringRegex = /^[a-zA-Z0-9 ]+$/;

export function validateUser(user: IUser): boolean {
  if (!emailRegex.test(user.email)) {
    console.error("Invalid email format!");
    return false;
  }
  if (!stringRegex.test(user.password) || user.password === "") {
    console.error("Invalid password format!");
    return false;
  }
  if (user.role && (!stringRegex.test(user.role) || user.role === "")) {
    console.error("Invalid role format!");
    return false;
  }

  return true;
}