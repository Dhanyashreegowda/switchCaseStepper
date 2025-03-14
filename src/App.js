// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stepper from "./components/Stepper";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stepper />} />
      </Routes>
    </Router>
  );
};

export default App;