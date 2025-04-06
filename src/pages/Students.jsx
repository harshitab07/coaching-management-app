import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/layout";
import '../styles/students.css';
import FetchAllStudentsApi from "../utils/students/FetchAllStudentsApi";
import { NavLink } from "react-router-dom";

const Students = () => {
  const studentDataTemp = [
    {
      id: 13,
      user_id: "65123abcde789",
      is_active: 1,
      first_name: "Mark",
      last_name: "Otto",
      phone_number: "9876543210",
      date_of_joining: "2025-01-01",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        pincode: 10001,
      },
    },
    {
      id: 22,
      user_id: "65123fghij123",
      is_active: 1,
      first_name: "Jacob",
      last_name: "Thornton",
      phone_number: "9123456789",
      date_of_joining: "2025-01-01",
      address: {
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        pincode: 90001,
      },
    },
    {
      id: 31,
      user_id: "65123klmno456",
      is_active: 0,
      first_name: "Larry",
      last_name: "Bird",
      phone_number: "9988776655",
      date_of_joining: "2025-01-01",
      address: {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        pincode: 60601,
      },
    },
  ];

  const [studentData, setStudentData] = useState([]);
  const fetchStudents = async() => {
    try {
      const res = await FetchAllStudentsApi();
      if (!res.data.success) toast.error(res.data.message);
      else {
        setStudentData(res.data.data.students);
      }
    } catch (error) {
      console.log("Students fetching failed", { error });
      toast.error("Failed to fetch students");
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Layout title="My-Coaching Management App : Students">
    <div className="d-flex flex-column justify-content-center align-items-center students_table ">
        <h2 className="text-center text-primary mb-4">Student Data</h2>
        <div className="table-responsive w-75 mx-auto">
          <table className="table table-hover table-striped table-bordered shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Active Status</th>
                <th scope="col">Name</th>
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
                      <span className={student.is_active ? "badge bg-success" : "badge bg-danger"}>
                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td><NavLink to={`/student/${student._id}`}>{student.name}</NavLink></td>
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
