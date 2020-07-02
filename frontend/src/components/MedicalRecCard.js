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
      <div>{record.medicalRecordId}</div>
      <div>{record.uploadedBy}</div>
      <div>{record.dateUploaded}</div>
      <div>{record.medicalRecordData}</div>
      <div>{record.consentTo}</div>
    </div>
  );
};

export default MedicalRecCard;
