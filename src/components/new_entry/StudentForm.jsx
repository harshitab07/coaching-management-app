import React from "react";

const StudentForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
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
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="phone_number" className="form-label">
          Phone Number
        </label>
        <input type="text" className="form-control" id="phone_number" />
      </div>
      <div className="mb-3">
        <label htmlFor="monthly_fees" className="form-label">
          Monthly Fees
        </label>
        <input
          type="text"
          className="form-control"
          id="monthly_fees"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="doj" className="form-label">
          Date of Joining
        </label>
        <input type="date" className="form-control" id="doj" />
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="street_name" className="form-label">
              Street Name
            </label>
            <input
              type="text"
              className="form-control"
              id="street_name"
            />
          </div>
          <div className="col">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row create_form_row">
          <div className="col">
            <label htmlFor="pin_code" className="form-label">
              Pin Code
            </label>
            <input
              type="text"
              className="form-control"
              id="pin_code"
            />
          </div>
          <div className="col">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
