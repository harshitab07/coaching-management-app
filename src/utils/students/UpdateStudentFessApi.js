import axios from "axios";

const UpdateStudentFeesApi = async (
  _id,
  month,
  fees
) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/students/update-student-fees`,
    {
      _id,
      month,
      fees
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

export default UpdateStudentFeesApi;