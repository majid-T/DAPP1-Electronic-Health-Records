import React, { useState, useEffect } from "react";

const DoctorA = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Doctor A</span>
    </div>
  );
};

export default DoctorA;
