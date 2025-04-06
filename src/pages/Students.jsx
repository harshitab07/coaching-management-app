import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/layout";
import "../styles/students.css";
import FetchAllStudentsApi from "../utils/students/FetchAllStudentsApi";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FetchActiveStudentsApi from "../utils/students/FetchActiveStudentsApi";
import FetchLeftStudentsApi from "../utils/students/FetchLeftStudentsApi";
import FetchCompletedStudentsApi from "../utils/students/FetchCompletedStudentsApi";

const Students = () => {
  const location = useLocation();

  const [studentData, setStudentData] = useState([]);

  const fetchStudents = async () => {
    try {
      let res;
      if (location.pathname === "/active-students") {
        res = await FetchActiveStudentsApi();
      } else if (location.pathname === "/left-students") {
        res = await FetchLeftStudentsApi();
      } else if (location.pathname === "/completed-students") {
        res = await FetchCompletedStudentsApi();
      } else {
        res = await FetchAllStudentsApi();
      }

      if (!res.data.success) toast.error(res.data.message);
      else setStudentData(res.data.data.students);
    } catch (error) {
      console.log("Students fetching failed", error);
      toast.error("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [location.pathname]);

  // const fetchStudents = async() => {
  //   try {
  //     const res = await FetchAllStudentsApi();
  //     if (!res.data.success) toast.error(res.data.message);
  //     else {
  //       setStudentData(res.data.data.students);
  //     }
  //   } catch (error) {
  //     console.log("Students fetching failed", { error });
  //     toast.error("Failed to fetch students");
  //   }
  // }

  // useEffect(() => {
  //   fetchStudents();
  // }, []);

  return (
    <Layout title="My-Coaching Management App : Students">
      <div className="d-flex flex-column justify-content-center align-items-center students_table ">
        <h2 className="text-center text-primary mb-4">Student Data</h2>
        <div className="table-responsive w-75 mx-auto">
          <table className="table table-hover table-striped table-bordered shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Name</th>
                <th scope="col">Father's Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Date of Joining</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => {
                return (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <NavLink to={`/student/${student._id}`}>
                        {student.name}
                      </NavLink>
                    </td>
                    <td>{student.father_name}</td>
                    <td>{student.phone_number}</td>
                    <td>{student.date_of_joining}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Students;
