import axios from "axios";

const DeleteStudentApi = async (_id) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/students/delete-student`,
    {
      _id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response;
};

export default DeleteStudentApi;
