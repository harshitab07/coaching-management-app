import axios from "axios";

const UpdateStudentApi = async (
  _id,
  name,
  father_name,
  adhaar_number,
  phone_number,
  course,
  status,
  date_of_joining,
  address,
  admin_id
) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/students/update-student`,
    {
      _id,
      name,
      adhaar_number,
      father_name,
      phone_number,
      date_of_joining,
      course,
      address,
      status,
      admin_id,
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

export default UpdateStudentApi;