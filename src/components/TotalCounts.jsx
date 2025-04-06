import React from "react";

const TotalCounts = ({heading, count}) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalCounts;
