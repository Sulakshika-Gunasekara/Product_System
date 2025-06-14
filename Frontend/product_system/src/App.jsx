import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard"; // The main dashboard page
import PrivateRoute from "./PrivateRoute"; // A custom route component for protected routes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
