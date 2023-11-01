import React, {useContext, useEffect} from 'react';
import { AuthContext } from './components/Auth/AuthContext';  
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
import FileUploadPage from './components/MedicalRecords/UploadForm';

import './App.css';

function App() {
  const { startLogoutTimer, clearLogoutTimer } = useContext(AuthContext);

  useEffect(() => {
    const resetTimer = () => {
      clearLogoutTimer();
      startLogoutTimer();
    };

    window.addEventListener("click", resetTimer);
    window.addEventListener("mousemove", resetTimer);

    return () => {
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
    };
  }, [startLogoutTimer, clearLogoutTimer]);

  return (
      <Router>
        <div className="flex">
          <MyNavbar />
          <div className="ml-auto w-full scrollable-div">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/register-doctor" element={<DoctorRegisterPage />} />
              <Route path="/register-patient" element={<PatientRegisterPage />} />
              <Route path="/patient-appointments" element={<AppointmentDashboard />} />
              <Route path="/SearchBar" element={<SearchBar />} />
              <Route path="/DoctorProfile/:doctorId" element={<DoctorProfile/>} />
              <Route path="/PatientProfile/:patientId" element={<PatientProfile/>} />
              <Route path="/MyDocs/" element={<FileUploadPage/>} />

            </Routes>
          </div>
        </div>
      </Router>
  );
}
export default App;
