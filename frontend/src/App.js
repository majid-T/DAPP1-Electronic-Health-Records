import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Patient from "./components/Patient";
import DoctorA from "./components/DoctorA";
import DoctorB from "./components/DoctorB";
import FamilyMember from "./components/FamilyMember";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="mainPanel">
        <Switch>
          <Route path="/Patient" render={(props) => <Patient {...props} />} />
          <Route path="/DoctorA" render={(props) => <DoctorA {...props} />} />
          <Route path="/DoctorB" render={(props) => <DoctorB {...props} />} />
          <Route
            path="/FamilyMember"
            render={(props) => <FamilyMember {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
