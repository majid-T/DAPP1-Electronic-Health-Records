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

const MedicalRecCard = (props) => {
  const record = props.record;
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
      <div>
        Access List:
        {record.consentTo.map((item, key) => {
          return <p>{item}</p>;
        })}
      </div>
    </div>
  );
};

export default MedicalRecCard;
