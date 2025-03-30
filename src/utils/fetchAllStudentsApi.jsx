import React from 'react';
import axios from 'axios';

const fetchAllStudentsApi = async () => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/students/get-students`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response;
}

export default fetchAllStudentsApi
