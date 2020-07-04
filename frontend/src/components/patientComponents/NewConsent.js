import React, { useState, useEffect } from "react";

const NewConsent = (props) => {
  const medRecId = props.medRecId;
  const identity = props.identity;

  const [loading, setLoading] = useState(false);
  const [consentToId, setConsentToId] = useState("");
  useEffect(() => {}, [loading]);

  const provideConsent = () => {
    alert(
      `Provide consent to ${consentToId} for record ${medRecId} from identity ${identity}`
    );
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
