// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdmissionForm from './components/AdmissionForm';
import AdmissionForm2 from './components/AdmissionForm2';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<AdmissionForm2 />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;