import axios from 'axios';

const BASE_URL = 'https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com/user/login', {
        email: email,
        password: password
    });
      console.log(response, 'aqui')

    if (response.data === true) {
      // Handle successful login here (e.g., redirecting the user, saving tokens, etc.)
      return true;
    } else {
      // Handle failed login (e.g., show error message to the user)
      console.log("Login failed.");
      return false;
    }

  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export function validateEmail(user: any): boolean {
  if (!emailRegex.test(user.email)) {
    console.error("Invalid email format!");
    return false;
  }
  return true;
}

export const getUserByEmail = async (email: string) => {
  try {
      const response = await axios.get(`${BASE_URL}/user/byEmail/${email}`);
      return response.data;
  } catch (error) {
      throw error;
  }
};
