import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchStudentApi from "../utils/students/FetchStudentApi";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/layout/layout";
import "../styles/studentDetails.css";
import UpdateEntryButton from "../components/update_entry.jsx/UpdateEntryButton";

const Student = () => {
  const params = useParams();
  const id = params.id;
  const [studentData, setStudentData] = useState([]);

  const fetchStudent = async () => {
    try {
      const res = await FetchStudentApi(id);
      if (!res.data.success) toast.error(res.data.message);
      else {
        setStudentData(res.data.data);
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
    status,
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

        <div className="student_details_form d-flex flex-column justify-content-center">
          <h3 className="text-center mb-3">Student Details</h3>
          <form>
            <div className="mb-3">
              <div className="row create_form_row_details">
                <div className="col">
                  <label htmlFor="first_name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={name}
                  />
                </div>
                <div className="col">
                  <label htmlFor="father_name" className="form-label">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="father_name"
                    value={father_name}
                  />
                </div>
                <div className="col">
                  <label htmlFor="adhaar_number" className="form-label">
                    Adhaar Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adhaar_number"
                    value={adhaar_number}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row create_form_row_details">
                <div className="col">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="course"
                    value={course}
                  />
                </div>
                <div className="col">
                  <label htmlFor="doj" className="form-label">
                    Date of Joining
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="doj"
                    value={date_of_joining}
                  />
                </div>
                <div className="col">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    value={status}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Student;
