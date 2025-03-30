import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CreateStudentApi from "../../utils/createEntry/CreateStudentApi";

const StudentForm = () => {
  const formRef = useRef()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Ramnagar");
  const [state, setState] = useState("Uttarakhand");
  const [pinCode, setPinCode] = useState("244715");
  const [monthlyFees, setMonthlyFees] = useState("");
  const [doj, setDoj] = useState("");
  const role = "student";

  const convertDateToDisplayFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const address = {
        'street' : street,
        'city' : city,
        'pincode': pinCode,
        'state': state
      }

      const dojConverted =  convertDateToDisplayFormat(doj);
      const res = await CreateStudentApi(firstName, lastName, email, phone, address, monthlyFees, dojConverted, role);

      if (!res.data.isResultCorrect) toast.error(res.data.message);
      else {
        toast.success('Student created successfully!');
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (error) {
      console.log('Create student failed', { error });
      toast.error('Failed to create student');
    }
}

  return (
    <form ref={formRef}>
      <ToastContainer />
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="phone_number" className="form-label">
          Phone Number
        </label>
        <input type="text" className="form-control" id="phone_number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="monthly_fees" className="form-label">
          Monthly Fees
        </label>
        <input type="text" className="form-control" id="monthly_fees" value={monthlyFees} onChange={(e) => setMonthlyFees(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="doj" className="form-label">
          Date of Joining
        </label>
        <input type="date" className="form-control" id="doj" value={doj} onChange={(e) => setDoj(e.target.value)} />
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="street_name" className="form-label">
              Street Name
            </label>
            <input type="text" className="form-control" id="street_name" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="pin_code" className="form-label">
              Pin Code
            </label>
            <input type="text" className="form-control" id="pin_code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} class="btn btn-primary">Create Student</button>
    </form>
  );
};

export default StudentForm;
