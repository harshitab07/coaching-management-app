import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/layout";
import "../styles/students.css";
import FetchAllStudentsApi from "../utils/students/FetchAllStudentsApi";
import { NavLink, useLocation } from "react-router-dom";
import FetchActiveStudentsApi from "../utils/students/FetchActiveStudentsApi";
import FetchLeftStudentsApi from "../utils/students/FetchLeftStudentsApi";
import FetchCompletedStudentsApi from "../utils/students/FetchCompletedStudentsApi";

const Students = () => {
  const location = useLocation();
  const [studentData, setStudentData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
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

      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        setStudentData(res.data.data.students);
        setFilteredStudents(res.data.data.students);
      }
    } catch (error) {
      console.log("Students fetching failed", error);
      toast.error("Failed to fetch students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [location.pathname]);

  // Live filtering based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(studentData);
    } else {
      const filtered = studentData.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, studentData]);

  const handleReset = () => {
    setSearchQuery("");
    setFilteredStudents(studentData);
  };

  return (
    <Layout title="My-Coaching Management App : Students">
      <div className="d-flex flex-column justify-content-center align-items-center students_table">
        <h2 className="text-center text-primary mb-4">Student Data</h2>

        <div className="mb-4 w-75 d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: "250px" }}
          />
          <button className="btn btn-primary" onClick={handleReset}>
            All Students
          </button>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                {filteredStudents.map((student, index) => (
                  <tr key={student._id}>
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Students;
