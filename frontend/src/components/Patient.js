import React, { useState, useEffect } from "react";
import MedicalRecCard from "./patientComponents/MedicalRecCard";

const Patient = (props) => {
  const identity = { name: "jenny", id: "0" };
  const apiUrl = props.apiUrl;
  const [loading, setLoading] = useState(false);
  const [medRecords, setMedRecords] = useState([]);

  const loadPatientRecords = () => {
    setLoading(true);

    fetch(
      `${apiUrl}get-medical-record/?patientId=${identity.id}&recId=all&userId=${identity.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMedRecords(data.data);
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
