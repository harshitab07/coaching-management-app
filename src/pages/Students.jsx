import React from "react";
import Layout from "../components/layout/layout";

const Students = () => {
  const studentData = [
    { id: 13, name: "Mark Otto", phone: "9876543210", feeStatus: "Paid" },
    { id: 22, name: "Jacob Thornton", phone: "9123456789", feeStatus: "Unpaid" },
    { id: 31, name: "Larry the Bird", phone: "9988776655", feeStatus: "Paid" },
  ];

  return (
    <div>
      <Layout title="My-Coaching Management App : Students">
      <h2>Student Data</h2>
        <table className="table table-dark table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Fee Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {studentData.map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{student.id}</th>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>
                  <div className="form-floating">
                    <select
                      className="form-select"
                      aria-label="Floating label select example"
                      defaultValue={student.feeStatus}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Students;
