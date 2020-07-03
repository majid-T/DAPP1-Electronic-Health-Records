import React, { useState, useEffect } from "react";
import MedicalRecCard from "./MedicalRecCard";

const Patient = (props) => {
  const [loading, setLoading] = useState(false);
  const [medRecords, setMedRecords] = useState([
    {
      medicalRecordId: "MA-1001",
      uploadedBy: "Doctor A",
      dateUploaded: "01/01/01",
      medicalRecordData:
        "Deserunt adipisicing labore ut incididunt.Exercitation eu nostrud ad cupidatat deserunt in excepteur sint proident laboris cupidatat.",
      consentTo: ["DoctorA"],
    },
    {
      medicalRecordId: "MA-1002",
      uploadedBy: "Doctor A",
      dateUploaded: "01/01/01",
      medicalRecordData:
        "Deserunt adipisicing labore ut incididunt.Exercitation eu nostrud ad cupidatat deserunt in excepteur sint proident laboris cupidatat.",
      consentTo: [],
    },
    {
      medicalRecordId: "MA-1003",
      uploadedBy: "Doctor B",
      dateUploaded: "01/01/01",
      medicalRecordData:
        "Deserunt adipisicing labore ut incididunt.Exercitation eu nostrud ad cupidatat deserunt in excepteur sint proident laboris cupidatat.",
      consentTo: ["DoctorB", "DoctorA"],
    },
    {
      medicalRecordId: "MA-1004",
      uploadedBy: "Doctor B",
      dateUploaded: "01/01/01",
      medicalRecordData:
        "Deserunt adipisicing labore ut incididunt.Exercitation eu nostrud ad cupidatat deserunt in excepteur sint proident laboris cupidatat.",
      consentTo: ["DoctorB", "DoctorA"],
    },
  ]);
  useEffect(() => {}, [loading]);

  return (
    <div>
      <div className="container">
        <span className="ribbon">{props.patientName}</span>

        {loading ? (
          <p>Loading...</p>
        ) : (
          medRecords.map((rec, key) => {
            return <MedicalRecCard record={rec} />;
          })
        )}
      </div>
    </div>
  );
};

export default Patient;
