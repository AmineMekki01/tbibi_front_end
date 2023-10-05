import React from 'react';
import ViewCalendar from './ViewCalendar';
import ManageTimeBlocks from './ManageTimeBlocks';

function DoctorDashboard() {
  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <ViewCalendar />
      <ManageTimeBlocks />
    </div>
  );
}

export default DoctorDashboard;
