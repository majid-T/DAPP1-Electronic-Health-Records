import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Patient from "./components/Patient";
import DoctorA from "./components/DoctorA";
import DoctorB from "./components/DoctorB";
import FamilyMember from "./components/FamilyMember";

function App() {
  const patientName = "Patient A";
  const drA_Name = "Doctor A";
  const drb_Name = "Doctor B";
  const fmlyMemName = "Family Member for Patient A";
  const API_URL = "http://35.225.87.109:3900/record/";

  return (
    <BrowserRouter>
      <Navigation />
      <div className="mainPanel">
        <Switch>
          <Route
            path="/Patient"
            render={(props) => (
              <Patient {...props} patientName={patientName} apiUrl={API_URL} />
            )}
          />
          <Route
            path="/DoctorA"
            render={(props) => (
              <DoctorA {...props} drName={drA_Name} apiUrl={API_URL} />
            )}
          />
          <Route
            path="/DoctorB"
            render={(props) => (
              <DoctorB {...props} drName={drb_Name} apiUrl={API_URL} />
            )}
          />
          <Route
            path="/FamilyMember"
            render={(props) => (
              <FamilyMember
                {...props}
                fmlyMemberName={fmlyMemName}
                apiUrl={API_URL}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
