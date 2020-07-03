import React, { useState, useEffect } from "react";

const AccessItem = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteConsent = (e) => {
    alert(props.name);
  };

  useEffect(() => {}, [loading]);

  return (
    <div>
      {props.name}
      <button className="removeButton" onClick={deleteConsent}>
        X
      </button>
    </div>
  );
};

export default AccessItem;
