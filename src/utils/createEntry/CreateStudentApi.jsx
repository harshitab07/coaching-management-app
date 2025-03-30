import React from 'react';
import axios from 'axios';

const CreateStudentApi = async (first_name, last_name, email, phone_number, address, monthly_fees, date_of_joining, role) => {
    console.log(first_name, last_name, email, phone_number, address, monthly_fees, date_of_joining, role);
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/students/create-student`,
        {
          first_name,
          last_name,
          email,
          phone_number,
          date_of_joining,
          monthly_fees,
          address,
          role,
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