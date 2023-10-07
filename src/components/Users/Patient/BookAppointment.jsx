import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';
import { TimeSlot, BookAppointmentBlock, TimeSlotContainer, BookingButton} from './styles/BookAppointmentStyles';

function BookAppointment() {
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());   const [timeZone, setTimeZone] = useState('');
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 6);
  


  useEffect(() => {
    setTimeZone(moment.tz.guess()); 
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {  
      setCurrentTime(new Date());
    }, 60000);  

    return () => clearInterval(intervalId);  
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
    <BookAppointmentBlock>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={currentDate}
        maxDate={maxDate}
        className='mb-2'
      />
      <TimeSlotContainer>
        {availability.map(slot => {
          const localStart = moment(slot.availability_start).tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');
          const localEnd = moment(slot.availability_end).tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');
  
          return (
            <TimeSlot
            key={slot.availability_id}
            onClick={() => handleSlotClick(slot)}
            isSelected={selectedSlot && selectedSlot.availability_id === slot.availability_id}
          >
            {localStart.split(' ')[1]} - {localEnd.split(' ')[1]}
          </TimeSlot>
          );
        })}
      </TimeSlotContainer>
      {selectedSlot && (

        <BookingButton onClick={handleBookAppointment}>Book Appointment</BookingButton>
      )}
    </BookAppointmentBlock>
  );
}

export default BookAppointment;