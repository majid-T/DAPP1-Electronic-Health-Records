import React, { useState, useEffect } from "react";
import RequestForPatientData from "./doctorComponents/RequestForPatientData";
import RecordDoctorView from "./doctorComponents/RecrodDoctorView";
import AddRecordByDr from "./doctorComponents/AddRecordByDr";
const DoctorA = (props) => {
  const identity = "doctorA";
  const [loading, setLoading] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);

  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Doctor A</span>
      <AddRecordByDr identity={identity} />
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

export default DoctorA;
