import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import TotalCounts from "../components/TotalCounts";
import "../styles/dashboard.css";
import "../styles/createEntry.css";
import CreateNewEntryButton from "../components/new_entry/CreateNewEntryButton";
import { toast } from "react-toastify";
import FetchAllStudentsApi from "../utils/students/FetchAllStudentsApi";
import Spinner from "../components/Spinner";
import FetchPendingFeesApi from "../utils/FetchPendingFeesApi";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalActiveStudents, setTotalActiveStudents] = useState(0);
  const [totalCompletedStudents, setTotalCompletedStudents] = useState(0);
  const [totalLeftStudents, setTotalLeftStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentsWithPendingFees, setStudentWithPendingFees] = useState([]);
  const [pendingFees, setPendingFees] = useState(0);

  const fetchStudentsCount = async () => {
    setLoading(true);
    try {
      const res = await FetchAllStudentsApi();
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        setTotalStudents(res.data.data.total);
        const statusCounts = res.data.data.students.reduce((acc, student) => {
          const status = student.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        setTotalActiveStudents(statusCounts["On-Going"] ?? 0);
        setTotalCompletedStudents(statusCounts["Completed"] ?? 0);
        setTotalLeftStudents(statusCounts["Left"] ?? 0);
      }
    } catch (error) {
      console.log("Students fetching failed", error);
      toast.error("Failed to fetch students");
    }
    setLoading(false);
  };

  const fetchPendingFees = async () => {
    setLoading(true);
    try {
      const res = await FetchPendingFeesApi(currentMonth);
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        setStudentWithPendingFees(res.data.data.studentDetails);
        setPendingFees(res.data.data.pendingFees);
      }
    } catch (error) {
      console.log("Pending fees fetching failed", error);
      toast.error("Failed to fetch pending fees");
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchStudentsCount();
    fetchPendingFees();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner message="Fetching Data.." />
      ) : (
        <Layout title="My-Coaching Management App : Dashboard">
          <div className="dashboard_container d-flex flex-column">
            <div className="d-flex flex-wrap dashboard_total_counts">
              <div className="d-flex flex-column students_count count_create">
                <TotalCounts
                  heading="Total Students"
                  count={totalStudents}
                  activeCount={totalActiveStudents}
                  leftCount={totalLeftStudents}
                  completedCount={totalCompletedStudents}
                  type="students"
                />
                <CreateNewEntryButton type="Student" />
              </div>
            </div>
          </div>
          <div className="dashboard_container pending_fees_container d-flex flex-column mb-4">
            <div className="pending_fees w-75 mx-auto mb-4">
              <h6>Total Pending Fees for Month of {currentMonth}: </h6> <span>{pendingFees} (Total students = {studentsWithPendingFees.length})</span>
            </div>
            <div className="table-responsive w-75 mx-auto">
              <h4>Students with pending fees:</h4>
              <div className="pending-fees-table">
              <table className="table table-hover table-striped table-bordered shadow-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Father's Name</th>
                    <th scope="col">Pending Fees for {currentMonth}</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsWithPendingFees.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <NavLink to={`/student/${student.id}`}>
                          {student.name}
                        </NavLink>
                      </td>
                      <td>{student.father_name}</td>
                      <td>{student.fees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Dashboard;
