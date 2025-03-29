import axios from "axios";

const LoginApi = async ( email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          email,
          password,
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
  
export default LoginApi;