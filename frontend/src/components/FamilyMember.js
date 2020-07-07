import React, { useState, useEffect } from "react";
import RequestForPatientData from "./RequestForPatientData";
import RecordDoctorView from "./RecrodView";

const FamilyMember = (props) => {
  const apiUrl = props.apiUrl;
  const identity = "family";
  const [loading, setLoading] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);

  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Family</span>
      <RequestForPatientData
        identity={identity}
        setPatientRecords={setPatientRecords}
        apiUrl={apiUrl}
      />
      {patientRecords.length > 0 ? (
        patientRecords.map((rec, key) => {
          return <RecordDoctorView key={key} record={rec} />;
        })
      ) : (
        <p>There are no records for now</p>
      )}
    </div>
  );
};

export default FamilyMember;
