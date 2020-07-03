import React, { useState, useEffect } from "react";

const FamilyMember = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Family Member</span>
    </div>
  );
};

export default FamilyMember;
