import axios from "axios";

const ForgetPasswordApi = async ( email, password, answer) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
        {
          email,
          password,
          answer
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
  
export default ForgetPasswordApi;