import React, { useState, useEffect } from "react";
<<<<<<< HEAD

const FamilyMember = (props) => {
  const [loading, setLoading] = useState(false);
=======
import RequestForPatientData from "./RequestForPatientData";
import RecordDoctorView from "./RecrodView";

const FamilyMember = (props) => {
  const identity = "family";
  const [loading, setLoading] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);

>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
  useEffect(() => {}, [loading]);

  return (
    <div className="container">
<<<<<<< HEAD
      <span className="ribbon">Family Member</span>
=======
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
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
    </div>
  );
};

export default FamilyMember;
