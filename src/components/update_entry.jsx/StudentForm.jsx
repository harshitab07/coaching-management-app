import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CreateStudentApi from "../../utils/createEntry/CreateStudentApi";

const StudentForm = ({data}) => {
  const { first_name, last_name, address, phone_number, is_active } = data;
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [phone, setPhone] = useState(phone_number);
  const [street, setStreet] = useState(address?.street);
  const [city, setCity] = useState(address?.city);
  const [pinCode, setPinCode] = useState(address?.pincode);
  const [isActive, setIsActive] = useState(is_active);

  useEffect(() => {
    setFirstName(first_name || '');
    setLastName(last_name || '');
    setPhone(phone_number || '');
    setStreet(address?.street || '');
    setCity(address?.city || '');
    setPinCode(address?.pincode || '');
    setIsActive(is_active || false);
  }, [ data ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const address = {
        'street' : street,
        'city' : city,
        'pincode': pinCode,
        'state': state
      }

      const res = await CreateStudentApi(firstName, lastName, phone, address, isActive);

      if (!res.data.isResultCorrect) toast.error(res.data.message);
      else {
        toast.success('Student updated successfully!');
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
            <label htmlFor="isActive" className="form-label">
              Is Student Active?
            </label>
            <input type="text" className="form-control" id="isActive" value={isActive} onChange={(e) => setIsActive(e.target.value)} />
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} class="btn btn-primary">Update Student</button>
    </form>
  );
};

export default StudentForm;
