import React from 'react';
import axios from 'axios';

const FetchAllStudentsFeesApi = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/students/get-students-fees`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response;
    
}

export default FetchAllStudentsFeesApi;
