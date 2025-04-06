import React from "react";
import UpdateEntryModal from "./UpdateEntryModal";

const UpdateEntryButton = ({ type, data }) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${type}Modal`}
        disabled={type === "Teacher"}
      >
        Edit {type} Details
      </button>

      <UpdateEntryModal type={type} id={`${type}Modal`} data={data} />
    </div>
  );
};

export default UpdateEntryButton;
