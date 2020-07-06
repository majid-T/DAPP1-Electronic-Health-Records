import React, { useState, useEffect } from "react";
<<<<<<< HEAD

const DoctorA = (props) => {
  const [loading, setLoading] = useState(false);
=======
import RequestForPatientData from "./RequestForPatientData";
import RecordDoctorView from "./RecrodView";
import AddRecordByDr from "./doctorComponents/AddRecordByDr";
const DoctorA = (props) => {
  const identity = "doctorA";
  const [loading, setLoading] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);

>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
  useEffect(() => {}, [loading]);

  return (
    <div className="container">
      <span className="ribbon">Doctor A</span>
<<<<<<< HEAD
=======
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
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
    </div>
  );
};

export default DoctorA;
