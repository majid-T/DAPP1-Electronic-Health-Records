import React, { useState, useEffect } from "react";

const RegisterUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [patientName, setPAtientName] = useState("");
  const apiUrl = props.apiUrl;

  const registerUser = (e) => {
    // prevenrDefault();
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin,X-Requested-With,Content-Type,Accept",
      },
      body: JSON.stringify({
        patientName: patientName,
      }),
    };
    fetch(`${apiUrl}register-user/`, requestOptions)
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)))
      .then(setLoading(false));
  };

  useEffect(() => {}, [loading]);

  return (
    <div>
      <form>
        <fieldset>
          <legend>Register a user</legend>
          <input
            type="string"
            placeholder="Patient name"
            onChange={(event) => setPAtientName(event.target.value)}
          ></input>
          <button type="button" onClick={registerUser}>
            Register
          </button>
        </fieldset>
      </form>
      {loading && <p>Registering User</p>}
    </div>
  );
};

export default RegisterUser;
