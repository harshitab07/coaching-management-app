// FetchActiveStudentsApi.js
import axios from 'axios';

const FetchActiveStudentsApi = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/students/active-students`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  );
  return response;
};

export default FetchActiveStudentsApi;
