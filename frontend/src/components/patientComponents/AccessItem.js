import React, { useState, useEffect } from "react";

const AccessItem = (props) => {
  const [loading, setLoading] = useState(false);
  const identity = props.identity;

  const deleteConsent = (e) => {
    alert(`Removing consent for ${props.name} from identity:${identity}`);
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
