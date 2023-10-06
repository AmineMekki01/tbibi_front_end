import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/Auth/LoginForm';
import RegisterPage from './components/Auth/RegisterForm';
import AppointmentDashboard from './pages/AppointmentDashboard';
import SearchBar from './components/Search/SearchBar';
import MyNavbar from './components/common/navbar/Navbar'; 
import BookAppointment from './pages/BookAppointment'; 
import ProfilePage from './components/Users/Doctor/DoctorProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex">
        <MyNavbar />
        <div className="ml-auto w-full scrollable-div">
          <Routes>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/patient-dashboard" element={<AppointmentDashboard />} />
            <Route path="/SearchBar" element={<SearchBar />} />
            <Route path="/BookAppointment/:doctorId" element={<BookAppointment />} />

            <Route path="/ProfilePage/:doctor_user_name" component={ProfilePage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
