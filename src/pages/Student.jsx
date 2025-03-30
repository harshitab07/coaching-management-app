import React from "react";
import { useParams } from "react-router-dom";

const Student = () => {
  const params = useParams();
  const id = params.id;
  console.log(id);
  return (
    <div>

    </div>
  );
};

export default Student;
