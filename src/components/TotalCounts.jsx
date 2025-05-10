import React from "react";
import { NavLink } from "react-router-dom";

const TotalCounts = ({
  heading,
  count,
  activeCount,
  completedCount,
  leftCount,
}) => {
  return (
    <div>
      <div className="card mx-4">
        <div className="card-body">
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">{count}</p>

          <div className="total_students_count">
            <NavLink to="/active-students">
              <div className="card active">
                <div className="card-body">
                  <h5 className="card-title">Active Students</h5>
                  <p className="card-text">{activeCount}</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/completed-students">
              <div className="card completed">
                <div className="card-body">
                  <h5 className="card-title">Completed Students</h5>
                  <p className="card-text">{completedCount}</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/left-students">
              <div className="card left">
                <div className="card-body">
                  <h5 className="card-title">Left Students</h5>
                  <p className="card-text">{leftCount}</p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCounts;
