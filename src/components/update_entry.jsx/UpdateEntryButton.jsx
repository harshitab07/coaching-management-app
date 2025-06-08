import React from "react";
import UpdateEntryModal from "./UpdateEntryModal";
import { useAuth } from "../../context/auth";

const UpdateEntryButton = ({ type, data }) => {
    const [auth] = useAuth();
  
        if (!auth?.user) {
          toast.error("Please login in with admin account");
          return;
        }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${type}Modal`}
        disabled={type === "Teacher" || !auth?.user?.is_super_admin}
      >
        Edit {type} Details
      </button>

      <UpdateEntryModal type={type} id={`${type}Modal`} data={data} />
    </div>
  );
};

export default UpdateEntryButton;
