import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';

function BookAppointment({ match }) {
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());   const [timeZone, setTimeZone] = useState('');
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 6);
  useEffect(() => {
    setTimeZone(moment.tz.guess());  // Set the user's time zone
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {  // Step 3: Update useEffect (Optional)
      setCurrentTime(new Date());
    }, 60000);  // update every minute

    return () => clearInterval(intervalId);  // cleanup on unmount
  }, []);

  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    const currentTime = new Date().toISOString();

    axios.get(`http://localhost:3001/api/v1/availabilities?doctorId=${doctorId}&day=${dateString}&currentTime=${currentTime}&timeZone=${timeZone}`)
      .then(response => {
        setAvailability(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [doctorId, selectedDate, timeZone]); 

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = () => {
    const reservationDetails = {
      start: selectedSlot.availability_start,
      end: selectedSlot.availability_end,
      title: 'New Appointment',
      doctor_id: doctorId,
      patient_id: '2859758e-6f16-4d8a-a9a1-5cdf28742b16',  
      availability_id: selectedSlot.availability_id,
    };

    axios.post('http://localhost:3001/api/v1/reservations', reservationDetails)
    .then(response => {
      alert('Appointment booked successfully!');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={currentDate}
        maxDate={maxDate}  // Set the maximum selectable date
      />
        {availability.map(slot => {
      const localStart = moment(slot.availability_start).tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');  // Adjust time zone
      const localEnd = moment(slot.availability_end).tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');  // Adjust time zone

      return (
          <div key={slot.availability_id} onClick={() => handleSlotClick(slot)}>
              {localStart} - {localEnd}
          </div>
      );
  })}
      {selectedSlot && (
        <button onClick={handleBookAppointment}>Book Appointment</button>
      )}
    </div>
  );
}

export default BookAppointment;
