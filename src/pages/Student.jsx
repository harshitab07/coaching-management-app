import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchStudentApi from "../utils/students/FetchStudentApi";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/layout/layout";
import "../styles/studentDetails.css";
import UpdateEntryButton from "../components/update_entry.jsx/UpdateEntryButton";
import FeesTable from "../components/FeesTable";
import DeleteStudentApi from "../utils/students/DeleteStudentApi";
import { useAuth } from "../context/auth";

const Student = () => {
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const params = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const id = params.id;
  const [studentData, setStudentData] = useState([]);
  const [month, setMonth] = useState("");

  const fetchStudent = async () => {
    try {
      const res = await FetchStudentApi(id);
      if (!res.data.success) toast.error(res.data.message);
      else {
        setStudentData(res.data.data);
        const doj = res.data.data.date_of_joining;
        const parts = doj?.split("/");
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

  const deleteStudentApi = async () => {
    try {
      const res = await DeleteStudentApi(id);
      if (!res.data.success || !res.data.isResultCorrect) toast.error(res.data.message);
      else {
        navigate('/active-students');
      }
    } catch (error) {
      console.log("Student deletion failed", { error });
      toast.error("Failed to delete student");
    }
  };

  if (!auth?.user) {
    toast.error("Please login in with admin account");
    return;
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="d-flex students_details_container flex-wrap">
        <ul className="nav flex-column">
          <li className="nav-item d-flex flex-column">
            <UpdateEntryButton type="Student" data={studentData} />
            <button
              className="btn btn-danger mt-2"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this student?"
                );
                if (confirmed) {
                  deleteStudentApi();
                }
              }}
              disabled={!auth?.user?.is_super_admin}
            >
              Delete Student
            </button>
          </li>
        </ul>

        <div className="student_details_form">
          <div>
            <span>Name: </span> {name || "John Doe"}
          </div>
          <div>
            <span>Father's Name:</span> {father_name || "Father Doe"}
          </div>
          <div>
            <span>Adhaar Number:</span> {adhaar_number || 999988887777}
          </div>
          <div>
            <span>Course:</span> {course || "Tally Full Course"}
          </div>
          <div>
            <span>Admission Fees:</span> Rs. {admission_fees || "500"}
          </div>
          <div>
            <span>Gender:</span> {gender || "---"}
          </div>
          <div>
            <span>Date of Joining:</span> {date_of_joining || "27/04/203"}
          </div>
        </div>
      </div>

      <FeesTable joinMonth={month} />
    </Layout>
  );
};

export default Student;
