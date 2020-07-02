import React, { useState, useEffect } from "react";

const DoctorB = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="participantName">Doctor B</span>
    </div>
  );
};

export default DoctorB;
