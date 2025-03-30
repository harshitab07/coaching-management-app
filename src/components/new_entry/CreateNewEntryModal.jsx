import React from "react";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";

const CreateNewEntryModal = ({ id, type }) => {
  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Create New {type}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {type === "Student" ? <StudentForm /> : <TeacherForm />}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Create {type}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewEntryModal;
