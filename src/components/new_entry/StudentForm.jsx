import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CreateStudentApi from "../../utils/createEntry/CreateStudentApi";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState("Male");
  const [status, setStatus] = useState("On-Going");
  const [doj, setDoj] = useState("");
  const [admissionFees, setAdmissionFees] = useState("");
  const [gender, setGender] = useState("Select Gender");

  const [auth] = useAuth();

  const convertDateToDisplayFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.user) {
      toast.error("Please login in with admin account");
      return;
    }

    const adminId = auth.user.id;
    try {
      const dojConverted = convertDateToDisplayFormat(doj);
      const res = await CreateStudentApi(
        name,
        adhaarNumber,
        fatherName,
        course,
        phone,
        address,
        dojConverted,
        status,
        adminId,
        admissionFees,
        gender
      );

      if (!res.data.isResultCorrect) toast.error(res.data.message);
      else {
        const id = res.data.data._id;
        toast.success("Student created successfully!");

        const modalEl = document.querySelector(".modal.show");
        if (modalEl && window.bootstrap?.Modal) {
          const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
          modalInstance?.hide();
        }

        setTimeout(() => navigate(`/student/${id}`), 1000);
      }
    } catch (error) {
      console.log("Create student failed", { error });
      toast.error("Failed to create student");
    }
  };

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
            <input
              type="text"
              className="form-control"
              id="adhaar_number"
              value={adhaarNumber}
              onChange={(e) =>
                setAdhaarNumber(e.target.value.replace(/\D/g, ""))
              }
              maxLength={12}
              minLength={12}
              pattern="\d{12}"
              required
            />
          </div>
          <div className="col">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              minLength={10}
              pattern="\d{10}"
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <select
              className="form-select"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="doj" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              className="form-control"
              id="doj"
              value={doj}
              onChange={(e) => setDoj(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="admission_fees" className="form-label">
              Admission Fees
            </label>
            <input
              type="text"
              className="form-control"
              id="admission_fees"
              value={admissionFees}
              onChange={(e) =>
                setAdmissionFees(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
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
      <button onClick={handleSubmit} class="btn btn-primary">
        Create Student
      </button>
    </form>
  );
};

export default StudentForm;
