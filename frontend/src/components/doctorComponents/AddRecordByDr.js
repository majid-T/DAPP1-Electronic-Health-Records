import React, { useState, useEffect } from "react";

const AddRecordByDr = (props) => {
  const identity = props.identity;
  const apiUrl = props.apiUrl;

  const [loading, setLoading] = useState(false);
  const [patientID, setPatientId] = useState("");
  const [medicalRecordId, setMedicalRecordId] = useState("");
  const [medicalRecordData, setMedicalRecordData] = useState("");

  useEffect(() => {}, [loading]);

  const addMedicalRecord = () => {
    //  patientId, medicalRecord;
    let medicalRecordObj = {
      medicalRecordId: medicalRecordId,
      uploadedBy: identity.name,
      medicalRecordData: medicalRecordData,
    };
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin,X-Requested-With,Content-Type,Accept",
      },
      body: JSON.stringify({
        patientId: patientID,
        medicalRecordObj: medicalRecordObj,
      }),
    };

    fetch(`${apiUrl}add-record/`, requestOptions)
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)))
      .then(setLoading(false));
  };

  return (
    <div className="container">
      <form>
        <fieldset>
          <legend>Add a medical report for patient:</legend>
          <input
            type="string"
            placeholder="Patient Id"
            onChange={(event) => setPatientId(event.target.value)}
          ></input>
          <input
            type="string"
            placeholder="Medical Record Id"
            onChange={(event) => setMedicalRecordId(event.target.value)}
          ></input>
          <textarea
            className="medicalDatainput"
            type="string"
            placeholder="Medical Data"
            onChange={(event) => setMedicalRecordData(event.target.value)}
          ></textarea>
          <button type="button" onClick={addMedicalRecord}>
            Add Data
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddRecordByDr;
