import React, { useState, useEffect } from "react";

const RequestForPatientData = (props) => {
  const identity = props.identity;
  const dummyRecords = [
    {
      medicalRecordId: "MA-1001",
      uploadedBy: "Doctor A",
      dateUploaded: "01/01/01",
      medicalRecordData:
        "Deserunt adipisicing labore ut incididunt.Exercitation eu nostrud ad cupidatat deserunt in excepteur sint proident laboris cupidatat.",
      consentTo: ["DoctorA"],
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
        "Exercitation eu nostrud ad cupidatat deserunt in excepteur sint proident laboris cupidatat.",
      consentTo: ["DoctorB", "DoctorA"],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [patientID, setPatientId] = useState("");

  useEffect(() => {}, [loading]);

  const requestPatientRecords = () => {
    // alert(`Requesting ${patientID} records from identity ${identity}`);
    props.setPatientRecords(dummyRecords);
  };

  return (
    <div className="container">
      <form>
        <fieldset>
          <legend>Request Patient recrods by Id:</legend>
          <input
            type="string"
            placeholder="Patient Id"
            onChange={(event) => setPatientId(event.target.value)}
          ></input>
          <button type="button" onClick={requestPatientRecords}>
            Request
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default RequestForPatientData;
