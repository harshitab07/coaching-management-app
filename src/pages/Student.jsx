import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchStudentApi from "../utils/students/FetchStudentApi";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/layout/layout";
import "../styles/studentDetails.css";
import UpdateEntryButton from "../components/update_entry.jsx/UpdateEntryButton";
import FeesTable from "../components/FeesTable";

const Student = () => {
  const allMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const params = useParams();
  const id = params.id;
  const [studentData, setStudentData] = useState([]);
  const [month, setMonth] = useState('');

  const fetchStudent = async () => {
    try {
      const res = await FetchStudentApi(id);
      if (!res.data.success) toast.error(res.data.message);
      else {
        setStudentData(res.data.data);
        const doj = res.data.data.date_of_joining;
        const parts = doj?.split('/');
        let monthIndex = parseInt(parts[1], 10) - 1;
        setMonth(allMonths[monthIndex]);
      }
    } catch (error) {
      console.log("Student fetching failed", { error });
      toast.error("Failed to fetch student");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const {
    name,
    father_name,
    adhaar_number,
    course,
    date_of_joining,
    admission_fees,
    gender,
  } = studentData;

  return (
    <Layout>
      <ToastContainer />
      <div className="d-flex students_details_container flex-wrap">
        <ul className="nav flex-column">
          <li className="nav-item">
            <UpdateEntryButton type="Student" data={studentData} />
          </li>
        </ul>

        <div className="student_details_form">
          <div>
            <span>Name: </span> {name || 'John Doe'}
          </div>
          <div>
            <span>Father's Name:</span> {father_name || 'Father Doe'}
          </div>
          <div>
            <span>Adhaar Number:</span> {adhaar_number || 999988887777}
          </div>
          <div>
            <span>Course:</span> {course || 'Tally Full Course'}
          </div>
          <div>
            <span>Admission Fees:</span> Rs. {admission_fees || '500'}
          </div>
          <div>
            <span>Gender:</span> {gender || '---'}
          </div>
          <div>
            <span>Date of Joining:</span> {date_of_joining || '27/04/203'}
          </div>
        </div>
      </div>

      <FeesTable joinMonth={month} />
    </Layout>
  );
};

export default Student;
