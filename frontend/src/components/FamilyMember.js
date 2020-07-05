import React, { useState, useEffect } from "react";
import RequestForPatientData from "./doctorComponents/RequestForPatientData";
import RecordDoctorView from "./doctorComponents/RecrodDoctorView";

const FamilyMember = (props) => {
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
      />
      {patientRecords.length > 0 ? (
        patientRecords.map((rec, key) => {
          return <RecordDoctorView record={rec} />;
        })
      ) : (
        <p>There are no records for now</p>
      )}
    </div>
  );
};

export default FamilyMember;
