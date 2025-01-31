import axios from 'axios';
import { IEmployee, IUser, IClient } from '../../interfaces';

const BASE_URL = 'https://bsqdkgnflh.execute-api.us-east-1.amazonaws.com';
const ADMIN_BASE_URL = 'https://api.aragaoeco.com.br'


export const uploadEmployeeFile = async (file: File[], rg: string): Promise<any> => {
    try {

        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i]);
        }
        formData.append('rg', rg);

        const response = await axios.post(`${BASE_URL}/fileUpload/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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

export const handleUpload = async (selectedFiles: Array<any>) => {

    const formData = new FormData();

    selectedFiles.forEach((file) => {

        formData.append('files', file);


    });


    try {

        const response = await fetch(`${ADMIN_BASE_URL}/upload`, {
            method: 'POST',

            body: formData,

            // If you're setting any custom headers like authentication tokens, you can set them here

        });


        const result = await response.json();

        if (response.ok) {

            console.log('Files uploaded successfully!', result);

        } else {

            console.error('Upload failed', result);

        }

    } catch (error) {

        console.error('There was an error uploading the files!', error);

    }

};

export const getFilesEmployee = async (): Promise<IEmployee | null> => {
    try {
        const response = await axios.get(`${ADMIN_BASE_URL}/files`);
        return response.data;
    } catch (error) {
        throw error;
    }
};