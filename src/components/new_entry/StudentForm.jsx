import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CreateStudentApi from "../../utils/createEntry/CreateStudentApi";
import { useAuth } from "../../context/auth";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("On-Going");
  const [doj, setDoj] = useState("");

  const [auth] = useAuth();

  const convertDateToDisplayFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.user) {
      toast.error('Please login in with admin account');
      return;
    }

    const adminId = auth.user.id;
    try {
      const dojConverted =  convertDateToDisplayFormat(doj);
      const res = await CreateStudentApi(name, adhaarNumber, fatherName, course, phone, address, dojConverted, status, adminId);

      if (!res.data.isResultCorrect) toast.error(res.data.message);
      else {
        toast.success('Student created successfully!');
      }
    } catch (error) {
      console.log('Create student failed', { error });
      toast.error('Failed to create student');
    }
}

  return (
    <form>
      <ToastContainer />
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="first_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="adhaar_number" className="form-label">
              Adhaar Number
            </label>
            <input type="text" className="form-control" id="adhaar_number" value={adhaarNumber} onChange={(e) => setAdhaarNumber(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input type="text" className="form-control" id="phone_number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <input type="text" className="form-control" id="course" value={course} onChange={(e) => setCourse(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="doj" className="form-label">
              Date of Joining
            </label>
            <input type="date" className="form-control" id="doj" value={doj} onChange={(e) => setDoj(e.target.value)} />
          </div>   
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select 
          className="form-select" 
          id="status" 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="On-Going">On-Going</option>
          <option value="Completed">Completed</option>
          <option value="Left">Left</option>
        </select>
      </div>
      <button onClick={handleSubmit} class="btn btn-primary">Create Student</button>
    </form>
  );
};

export default StudentForm;
