import React, { useState, useEffect } from "react";
<<<<<<< HEAD
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
=======
import MedicalRecCard from "./patientComponents/MedicalRecCard";

const Patient = (props) => {
  const identity = { name: "patient", id: "1" };
  const apiUrl = props.apiUrl;
  const [loading, setLoading] = useState(false);
  const [medRecords, setMedRecords] = useState([]);

  const loadPatientRecords = () => {
    setLoading(true);

    //TODO modify chaincode to send all record if all recived as medicalRecordId
    fetch(
      `${apiUrl}get-medical-record/?name=${identity}&recId=all&userId=${identity}`
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
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3

  return (
    <div>
      <div className="container">
        <span className="ribbon">{props.patientName}</span>
<<<<<<< HEAD

=======
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
        {loading ? (
          <p>Loading...</p>
        ) : (
          medRecords.map((rec, key) => {
<<<<<<< HEAD
            return <MedicalRecCard record={rec} />;
=======
            return (
              <MedicalRecCard
                key={key}
                record={rec}
                identity={identity}
                apiUrl={apiUrl}
              />
            );
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
          })
        )}
      </div>
    </div>
  );
};

export default Patient;
