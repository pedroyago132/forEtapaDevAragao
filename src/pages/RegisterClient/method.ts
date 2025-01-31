import axios from "axios";
import { IEmployee, IUser } from "../../interfaces";

const BASE_URL = "https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com";

// Create an Employee

export const validateInputValue = (inputName: string, value: string): boolean => {
  switch (inputName) {
    case "cnpj":
      return /^\d*$/.test(value);
    case "phone":
      return /^\d*$/.test(value);
    default:
      return true;
  }
};


export const createUser = async (userData: IUser) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/create`, userData);
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
