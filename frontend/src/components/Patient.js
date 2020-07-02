import React, { useState, useEffect } from "react";

const Patient = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="participantName">Patient</span>
    </div>
  );
};

export default Patient;
