import React from "react";
import Layout from "../components/layout/layout";

const Students = () => {
  const studentData = [
    {
      id: 13,
      user_id: "65123abcde789",
      is_active: 0,
      first_name: "Mark",
      last_name: "Otto",
      phone_number: "9876543210",
      date_of_joining: "2024-01-10",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        pincode: 10001,
      },
      feeStatus: "Paid",
    },
    {
      id: 22,
      user_id: "65123fghij123",
      is_active: 1,
      first_name: "Jacob",
      last_name: "Thornton",
      phone_number: "9123456789",
      date_of_joining: "2024-02-15",
      address: {
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        pincode: 90001,
      },
      feeStatus: "Unpaid",
    },
    {
      id: 31,
      user_id: "65123klmno456",
      is_active: 1,
      first_name: "Larry",
      last_name: "Bird",
      phone_number: "9988776655",
      date_of_joining: "2024-03-05",
      address: {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        pincode: 60601,
      },
      feeStatus: "Paid",
    },
  ];

  return (
    <div>
      <Layout title="My-Coaching Management App : Students">
        <h2 className="text-center text-primary mb-4">Student Data</h2>
        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">User ID</th>
                <th scope="col">Active Status</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Date of Joining</th>
                <th scope="col">Address</th>
                <th scope="col">Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={student.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.user_id}</td>
                  <td>
                    <span className={student.is_active ? "badge bg-success" : "badge bg-danger"}>
                      {student.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{`${student.first_name} ${student.last_name}`}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.date_of_joining}</td>
                  <td>
                    {student.address.street}, {student.address.city}, {student.address.state}, {student.address.pincode}
                  </td>
                  <td>
                    <span className={student.feeStatus === "Paid" ? "badge bg-success" : "badge bg-warning text-dark"}>
                      {student.feeStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default Students;
