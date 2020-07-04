import React, { useState, useEffect } from "react";

const AddRecordByDr = (props) => {
  const identity = props.identity;

  const [loading, setLoading] = useState(false);
  const [patientID, setPatientId] = useState("");
  const [medicalRecordId, setMedicalRecordId] = useState("");
  const [medicalRecordData, setMedicalRecordData] = useState("");

  useEffect(() => {}, [loading]);

  const addMedicalRecord = () => {
    alert(`Adding record for ${patientID} from identity ${identity}`);
    console.log("medical Record id:", medicalRecordId);
    console.log("medical Record data:", medicalRecordData);
  };

  return (
    <div className="container">
      <form>
        <fieldset>
          <legend>Add a medical report for patient:</legend>
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
