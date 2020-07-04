import React, { useState, useEffect } from "react";
import AccessItem from "./AccessItem";
import NewConsent from "./NewConsent";

const MedicalRecCard = (props) => {
  const identity = props.identity;
  const record = props.record;
  const consentList = record.consentTo;

  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  return (
    <div className="recordCard">
      <div className="idTag">{record.medicalRecordId}</div>
      <hr />
      <div className="height40">
        <div>{record.medicalRecordData}</div>
        <div className="signatureTag">
          By {record.uploadedBy} on {record.dateUploaded}
        </div>
        <hr />
      </div>
      <br />
      <NewConsent
        className="height20"
        medRecId={record.medicalRecordId}
        identity={identity}
      />
      <hr />
      <div>
        Access List: {consentList.length}
        {consentList.length != 0 ? (
          record.consentTo.map((item, key) => {
            return <AccessItem name={item} identity={identity} />;
          })
        ) : (
          <p>No consent is given for this record</p>
        )}
      </div>
    </div>
  );
};

export default MedicalRecCard;
