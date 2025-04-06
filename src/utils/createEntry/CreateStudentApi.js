import React from 'react';
import axios from 'axios';

const CreateStudentApi = async (name, adhaar_number, father_name, course, phone_number, address, date_of_joining, status, admin_id) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/students/create-student`,
        {
          name,
          adhaar_number,
          father_name,
          phone_number,
          date_of_joining,
          course,
          address,
          status,
          admin_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response;
}

export default CreateStudentApi;