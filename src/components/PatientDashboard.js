import React from 'react';
import SearchDoctors from './SearchDoctors';
import ViewAppointments from './ViewAppointments';
import Chatbot from './Chatbot';

function PatientDashboard() {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      <SearchDoctors />
      <ViewAppointments />
      <Chatbot />
    </div>
  );
}

export default PatientDashboard;
