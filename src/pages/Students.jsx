import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/layout";
import FetchAllStudentsFeesApi from "../utils/FetchAllStudentsFeesApi";
import '../styles/students.css';
import { parseDate } from "../utils/CommonFunctions";
import FetchAllStudentsApi from "../utils/FetchAllStudentsApi";
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

  const studentFeesDataTemp = [
    {
      student_id: "65123abcde789",
      monthly_fees: 5000,
      total_fees_paid: 5000,
      last_paid_amount: 5000,
      last_paid_date: "2025-02-02",
    },
    {
      student_id: "65123fghij123",
      monthly_fees: 4500,
      total_fees_paid: 9000,
      last_paid_amount: 4500,
      last_paid_date: "2025-03-01",
    },
    {
      student_id: "65123klmno456",
      monthly_fees: 5000,
      total_fees_paid: 15000,
      last_paid_amount: 5000,
      last_paid_date: "2025-04-01",
    },
  ];

  const [studentData, setStudentData] = useState([]);
  const [studentFeesData, setStudentFeesData] = useState([]);
  const fetchStudents = async() => {
    try {
      const res = await FetchAllStudentsApi();
      if (!res.data.success) toast.error(res.data.message);
      else {
        setStudentData(res.data.data.students);
      }

      const feesResponse = await FetchAllStudentsFeesApi();
      if (!res.data.success) toast.error(res.data.message);
      else {
        setStudentFeesData(feesResponse.data.data);
      }
    } catch (error) {
      console.log("Students fetching failed", { error });
      toast.error("Failed to fetch students");
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const calculateFeeStatus = (student) => {
    const feeRecord = studentFeesData.find(fee => fee.student_id === student._id);
    if (!feeRecord) return { feeStatus: "Unknown", unpaidAmount: "-" };
    
    const monthly_fees = feeRecord.monthly_fees;
    const total_fees_paid = feeRecord?.total_fees_paid ? feeRecord?.total_fees_paid : 0;
    const doj = parseDate(student.date_of_joining);
    const today = new Date();
    
    console.log(`Calculating fee status for ${student.first_name} ${student.last_name}`);
    console.log(`DOJ: ${doj.toDateString()}, Today: ${today.toDateString()}`);
    
    // Get the months from DOJ and today
    const monthsElapsed = (today.getFullYear() - doj.getFullYear()) * 12 + (today.getMonth() - doj.getMonth());
    
    // Ensure at least 1 month is counted
    const totalMonths = monthsElapsed + 1;
    console.log(`Months Elapsed: ${totalMonths}`);
    
    // Calculate total due amount based on months elapsed
    const totalDue = totalMonths * monthly_fees;
    console.log(`Total Due: ${totalDue}, Total Fees Paid: ${total_fees_paid}`);
    
    // Determine unpaid amount and fee status
    const unpaidAmount = Math.max(totalDue - total_fees_paid, 0);
    const feeStatus = unpaidAmount > 0 ? "Unpaid" : "Paid";
    
    console.log(`Fee Status: ${feeStatus}, Unpaid Amount: ${unpaidAmount}`);
    return { feeStatus, unpaidAmount };
};

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
                <th scope="col">Address</th>
                <th scope="col">Fee Status</th>
                <th scope="col">Unpaid Amount</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => {
                const { feeStatus, unpaidAmount } = calculateFeeStatus(student);
                return (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <span className={student.is_active ? "badge bg-success" : "badge bg-danger"}>
                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td><NavLink to={`/student/${student._id}`}>{`${student.first_name} ${student.last_name}`}</NavLink></td>
                    <td>{student.phone_number}</td>
                    <td>{student.date_of_joining}</td>
                    <td>
                      {student.address.street}, {student.address.city}, {student.address.state}, {student.address.pincode}
                    </td>
                    <td>
                      <span className={feeStatus === "Paid" ? "badge bg-success" : "badge bg-warning text-dark"}>
                        {feeStatus}
                      </span>
                    </td>
                    <td>{unpaidAmount}</td>
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
