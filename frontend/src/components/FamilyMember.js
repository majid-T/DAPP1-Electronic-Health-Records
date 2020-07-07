import React, { useState, useEffect } from "react";
import RequestForPatientData from "./RequestForPatientData";
import RecordDoctorView from "./RecrodView";

const FamilyMember = (props) => {
  const apiUrl = props.apiUrl;
  const identity = "family";
  const [loading, setLoading] = useState(false);
  const [patientRecord, setPatientRecord] = useState(null);

  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Family</span>
      <RequestForPatientData
        identity={identity}
        setPatientRecord={setPatientRecord}
        apiUrl={apiUrl}
      />
      {patientRecord != null ? (
        <RecordDoctorView record={patientRecord} />
      ) : (
        <p>There are no records for now</p>
      )}
    </div>
  );
};

export default FamilyMember;
