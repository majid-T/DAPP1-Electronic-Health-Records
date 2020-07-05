import React, { useState, useEffect } from "react";

const RecordDoctorView = (props) => {
  const record = props.record;

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
    </div>
  );
};

export default RecordDoctorView;
