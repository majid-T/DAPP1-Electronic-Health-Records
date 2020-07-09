import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="participantsBar">
      <Link className="participantsLabel" to="/Patient">
        Patient
      </Link>
      <Link className="participantsLabel" to="/DoctorA">
        Doctor A
      </Link>
      <Link className="participantsLabel" to="/DoctorB">
        Doctor B
      </Link>
      <Link className="participantsLabel" to="/FamilyMember">
        Family Member
      </Link>
    </div>
  );
};

export default Navigation;
