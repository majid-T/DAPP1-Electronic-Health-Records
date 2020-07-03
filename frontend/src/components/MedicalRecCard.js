// [
//   {
//     medicalRecordId: "String some Id",
//     uploadedBy: "String uploader Id",
//     dateUploaded: "String ISO Date",
//     medicalRecordData: "String anything",
//     consentTo: [
//       "String some Id or some public Key",
//       "String some Id or some public Key",
//       "String some Id or some public Key",
//       "String some Id or some public Key",
//     ],
//   },
// ];

import React, { useState, useEffect } from "react";
import AccessItem from "./AccessItem";
import NewConsent from "./NewConsent";

const MedicalRecCard = (props) => {
  const record = props.record;
  const consentList = record.consentTo;

  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  return (
    <div className="recordCard">
      <div className="idTag">{record.medicalRecordId}</div>
      <hr />
      <div>{record.medicalRecordData}</div>
      <hr />
      <div className="signatureTag">
        By {record.uploadedBy} on {record.dateUploaded}
      </div>
      <br />
      <NewConsent medRecId={record.medicalRecordId} />
      <hr />
      <div>
        Access List: {consentList.length}
        {consentList.length != 0 ? (
          record.consentTo.map((item, key) => {
            return <AccessItem name={item} />;
          })
        ) : (
          <p>No consent is given for this record</p>
        )}
      </div>
    </div>
  );
};

export default MedicalRecCard;
