import React from "react";
import { NavLink } from "react-router-dom";

const TotalCounts = ({heading, count, type}) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">{count}</p>
          <NavLink to={type} className="card-link total-count-link">
            See all {type}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TotalCounts;
