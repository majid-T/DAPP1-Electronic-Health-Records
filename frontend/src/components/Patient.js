import React, { useState, useEffect } from "react";
import MedicalRecCard from "./patientComponents/MedicalRecCard";
import RegisterUser from "./patientComponents/RegisterUser";

const Patient = (props) => {
  const identity = { name: "Majid", id: "PA0" };
  const apiUrl = props.apiUrl;
  const [loading, setLoading] = useState(false);
  const [medRecords, setMedRecords] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const loadPatientRecords = () => {
    setLoading(true);

    fetch(
      `${apiUrl}get-medical-record/?patientId=${identity.id}&recId=all&userId=${identity.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setMedRecords(data.data);
        } else {
          console.log(data.message);
          setShowRegister(true);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPatientRecords();
  }, []);

  return (
    <div>
      <div className="container">
        <span className="ribbon">{props.patientName}</span>
        {showRegister && <RegisterUser identity={identity} apiUrl={apiUrl} />}
        {loading ? (
          <p>Loading...</p>
        ) : (
          medRecords.map((rec, key) => {
            return (
              <MedicalRecCard
                key={key}
                record={rec}
                identity={identity}
                apiUrl={apiUrl}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Patient;
