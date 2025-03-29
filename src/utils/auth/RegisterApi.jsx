import axios from "axios";

const RegisterApi = async (firstName, lastName, email, password, answer, role) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          answer,
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
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
export default RegisterApi;