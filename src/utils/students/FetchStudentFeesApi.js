import axios from 'axios';

const FetchStudentFeesApi = async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/students/get-student-fees/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response;
}

export default FetchStudentFeesApi;
