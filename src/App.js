import React from 'react';
import AuthProvider from './components/Auth/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/Auth/LoginForm';
import DoctorRegisterPage from './components/Auth/RegisterDoctor';
import PatientRegisterPage from './components/Auth/RegisterPatient';
import RegisterPage from './components/Auth/RegisterPage';
import AppointmentDashboard from './pages/AppointmentDashboard';
import SearchBar from './components/Search/SearchBar';
import MyNavbar from './components/common/navbar/Navbar'; 
import DoctorProfile from './components/Users/Doctor/DoctorProfile';
import PatientProfile from './components/Users/Patient/PatientProfile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <MyNavbar />
          <div className="ml-auto w-full scrollable-div">
            <Routes>
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/register-doctor" element={<DoctorRegisterPage />} />
              <Route path="/register-patient" element={<PatientRegisterPage />} />
              <Route path="/patient-appointments" element={<AppointmentDashboard />} />
              <Route path="/SearchBar" element={<SearchBar />} />
              <Route path="/DoctorProfile/:doctorId" element={<DoctorProfile/>} />
              <Route path="/PatientProfile/:patientId" element={<PatientProfile/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
