import axios from 'axios';

const CreateStudentApi = async (name, adhaar_number, father_name, course, phone_number, address, date_of_joining, status, admin_id, admission_fees, gender, serial_number, monthly_fees) => {
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
          admin_id,
          admission_fees,
          gender,
          serial_number,
          monthly_fees
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