import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CreateStudentApi from "../../utils/createEntry/CreateStudentApi";
import { useAuth } from "../../context/auth";
import UpdateStudentApi from "../../utils/students/UpdateStudentApi";

const StudentForm = ({data}) => {
  const { name, father_name, adhaar_number, address, phone_number, status, course, date_of_joining, _id } = data;

  const [studentName, setStudentName] = useState(name);
  const [fatherName, setFatherName] = useState(father_name);
  const [phone, setPhone] = useState(phone_number);
  const [adhaarNumber, setAdhaarNumber] = useState(adhaar_number);
  const [studentCourse, setStudentCourse] = useState(course);
  const [studentAddress, setStudentAddress] = useState(address);
  const [studentStatus, setStudentStatus] = useState(status);
  const [doj, setDoj] = useState(date_of_joining);

  const convertDate = (dateString) => {
    if (dateString) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    }
  };

  useEffect(() => {
    setStudentName(name || '');
    setFatherName(father_name || '');
    setPhone(phone_number || '');
    setAdhaarNumber(adhaar_number || '');
    setStudentAddress(address || '');
    setStudentCourse(course || '');
    setStudentStatus(status || '');
    const formattedDoj = convertDate(date_of_joining);
    setDoj(formattedDoj || '');
  }, [ data ]);

    const [auth] = useAuth();

  const convertDateToDisplayFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!auth?.user) {
            toast.error('Please login in with admin account');
            return;
          }
      
        const adminId = auth.user.id;
      const updateDoj = convertDateToDisplayFormat(doj);
      const res = await UpdateStudentApi(_id, studentName, fatherName, adhaarNumber, phone, studentCourse, studentStatus, updateDoj, studentAddress, adminId);

      if (!res.data.isResultCorrect) toast.error(res.data.message);
      else {
        toast.success('Student updated successfully!');
        setInterval(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.log('Update student failed', { error });
      toast.error('Failed to update student');
    }
  }
  return (
    <form>
      <ToastContainer />
      <div className="mb-3">
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
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
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input type="text" className="form-control" id="phone_number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="adhaar_number" className="form-label">
              Adhaar Number
            </label>
            <input type="text" className="form-control" id="adhaar_number" value={adhaarNumber} onChange={(e) => setAdhaarNumber(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <input type="text" className="form-control" id="course" value={studentCourse} onChange={(e) => setStudentCourse(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="status" className="form-label">
              City
            </label>
            <select 
            className="form-select" 
            id="status" 
            value={studentStatus}
            onChange={(e) => setStudentStatus(e.target.value)}
          >
            <option value="On-Going">On-Going</option>
            <option value="Completed">Completed</option>
            <option value="Left">Left</option>
          </select>
          </div>
        </div>
      </div>
      <div className="mb-3">
      <label htmlFor="address" className="form-label">
      Address
    </label>
    <input type="text" className="form-control" id="address" value={studentAddress} onChange={(e) => setStudentAddress(e.target.value)} />
      </div>
      <div className="mb-3">
      <label htmlFor="doj" className="form-label">
      Date of Joining
    </label>
    <input type="date" className="form-control" id="doj" value={doj} onChange={(e) => setDoj(e.target.value)} />
      </div>
      <button onClick={handleSubmit} class="btn btn-primary">Update Student</button>
    </form>
  );
};

export default StudentForm;
