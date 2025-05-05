import axios from "axios";

const UpdateStudentFeesApi = async (_id, month, value, type, feeValue = null) => {
  // Determine the payload based on the update type
  let payload = {};

  if (type === 'fee') {
    payload = { _id, month, fees: value }; // For updating only the fee
  } else if (type === 'date') {
    payload = { _id, month, date: value, fees: feeValue }; // For updating only the date (include the current fee)
  } else if (type === 'both') {
    payload = { _id, month, fees: value.fee, date: value.date }; // For updating both fee and date
  }

  console.log("Sending payload to backend:", payload);

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/students/update-student-fees`,
    payload,
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
