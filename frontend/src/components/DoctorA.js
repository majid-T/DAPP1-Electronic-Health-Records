import React, { useState, useEffect } from "react";
import RequestForPatientData from "./RequestForPatientData";
import RecordDoctorView from "./RecrodView";
import AddRecordByDr from "./doctorComponents/AddRecordByDr";
const DoctorA = (props) => {
  const apiUrl = props.apiUrl;
  const identity = { name: "doctor A", id: "0" };
  const [loading, setLoading] = useState(false);
  const [patientRecord, setPatientRecord] = useState(null);

  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Doctor A</span>
      <AddRecordByDr identity={identity} apiUrl={apiUrl} />
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

export default DoctorA;
