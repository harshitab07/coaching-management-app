import React from "react";
import CreateNewEntryModal from "./CreateNewEntryModal";

const CreateNewEntryButton = ({ type }) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${type}Modal`}
        disabled={type === "Teacher"}
      >
        Create New {type}
      </button>

      <CreateNewEntryModal type={type} id={`${type}Modal`} />
    </div>
  );
};

export default CreateNewEntryButton;
