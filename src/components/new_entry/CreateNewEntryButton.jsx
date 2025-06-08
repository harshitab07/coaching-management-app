import React from "react";
import CreateNewEntryModal from "./CreateNewEntryModal";
import { useAuth } from "../../context/auth";

const CreateNewEntryButton = ({ type }) => {
  const [auth] = useAuth();

  if (!auth?.user) {
    toast.error("Please login in with admin account");
    return;
  }

  console.log(auth)

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${type}Modal`}
        disabled={type === "Teacher" || !auth?.user?.is_super_admin}
      >
        Create New {type}
      </button>

      <CreateNewEntryModal type={type} id={`${type}Modal`} />
    </div>
  );
};

export default CreateNewEntryButton;
