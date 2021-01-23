import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";

import ReadTrackersList from "./components/tracker-list.component";
import UpdateTracker from "./components/edit-tracker.component";
import CreateTracker from "./components/create-tracker.component";
//import DeleteTracker from "./components/navbar.component";

import CreateUser from "./components/create-user.component";
//import UpdateUser from "./components/navbar.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />

        <Route path="/" exact component={ReadTrackersList} />
        <Route path="/edit/:id" component={UpdateTracker} />
        <Route path="/create" component={CreateTracker} />
        
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
