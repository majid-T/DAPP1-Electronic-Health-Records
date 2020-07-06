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
<<<<<<< HEAD
=======
  const API_URL = "http://localhost:1000/";
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3

  return (
    <BrowserRouter>
      <Navigation />
      <div className="mainPanel">
        <Switch>
          <Route
            path="/Patient"
<<<<<<< HEAD
            render={(props) => <Patient {...props} patientName={patientName} />}
          />
          <Route
            path="/DoctorA"
            render={(props) => <DoctorA {...props} drName={drA_Name} />}
          />
          <Route
            path="/DoctorB"
            render={(props) => <DoctorB {...props} drName={drb_Name} />}
=======
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
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
          />
          <Route
            path="/FamilyMember"
            render={(props) => (
<<<<<<< HEAD
              <FamilyMember {...props} fmlyMemberName={fmlyMemName} />
=======
              <FamilyMember
                {...props}
                fmlyMemberName={fmlyMemName}
                apiUrl={API_URL}
              />
>>>>>>> d0ee318b33e78b97860a05ae03e73d8423e96cb3
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
