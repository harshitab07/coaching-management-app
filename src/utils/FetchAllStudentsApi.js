import axios from 'axios';

const FetchAllStudentsApi = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/students/get-students`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response;
}

export default FetchAllStudentsApi;
