import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import TotalCounts from "../components/TotalCounts";
import "../styles/dashboard.css";
import "../styles/createEntry.css";
import CreateNewEntryButton from "../components/new_entry/CreateNewEntryButton";
import { toast } from "react-toastify";
import FetchAllStudentsApi from "../utils/students/FetchAllStudentsApi";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalActiveStudents, setTotalActiveStudents] = useState(0);
  const [totalCompletedStudents, setTotalCompletedStudents] = useState(0);
  const [totalLeftStudents, setTotalLeftStudents] = useState(0);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchStudentsCount();
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
        </Layout>
      )}
    </div>
  );
};

export default Dashboard;
