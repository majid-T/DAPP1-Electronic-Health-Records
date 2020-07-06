import React, { useState, useEffect } from "react";

const NewConsent = (props) => {
  const medicalRecordId = props.medicalRecordId;
  const identity = props.identity;
  const apiUrl = props.apiUrl;

  const [loading, setLoading] = useState(false);
  const [consentToId, setConsentToId] = useState("");
  useEffect(() => {}, [loading]);

  const provideConsent = (e) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId: identity.id,
        medicalRecordId: medicalRecordId,
        consetTo: consentToId,
        identity: identity.name,
        status: "add",
      }),
    };
    fetch(`${apiUrl}modify-consent/`, requestOptions)
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)))
      .then(setLoading(false));
  };
  return (
    <div className="container">
      <form>
        <fieldset>
          <legend>Add Consent to:</legend>
          <input
            type="string"
            placeholder="user Id"
            id="consentInput"
            onChange={(event) => setConsentToId(event.target.value)}
          ></input>
          <button type="button" onClick={provideConsent}>
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default NewConsent;
