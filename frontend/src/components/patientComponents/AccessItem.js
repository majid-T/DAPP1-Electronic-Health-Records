import React, { useState, useEffect } from "react";

const AccessItem = (props) => {
  const [loading, setLoading] = useState(false);
  const identity = props.identity;
  const apiUrl = props.apiUrl;
  const medicalRecordId = props.medicalRecordId;

  const deleteConsent = (e) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId: identity.id,
        medicalRecordId: medicalRecordId,
        consetTo: props.name,
        identity: identity.name,
        status: "remove",
      }),
    };
    fetch(`${apiUrl}modify-consent/`, requestOptions)
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)))
      .then(setLoading(false));
  };

  useEffect(() => {}, [loading]);

  return (
    <div>
      {loading ? (
        <p>making changes</p>
      ) : (
        <div>
          {props.name}
          <button className="removeButton" onClick={deleteConsent}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessItem;
