import axios from 'axios';

const FetchPendingFeesApi = async (month) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/students/pending-fees-for-month`,
        {month},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response;
}

export default FetchPendingFeesApi;
