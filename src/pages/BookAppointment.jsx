import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from './BookAppointmentStyles'

const BookAppointment = ({ doctorId }) => {
  const [availabilities, setAvailabilities] = useState({});
  
  useEffect(() => {
    const fetchAvailabilities = async (day) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/availabilities?doctorId=${doctorId}&day=${day}`);
        return response.data;
      } catch (error) {
        console.error('Could not fetch availabilities:', error);
      }
    };

    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0]; // returns date as YYYY-MM-DD
    });

    const fetchAllAvailabilities = async () => {
      const allAvailabilities = {};
      for (const day of next7Days) {
        allAvailabilities[day] = await fetchAvailabilities(day);
      }
      setAvailabilities(allAvailabilities);
    };

    fetchAllAvailabilities();
  }, [doctorId]);

  return (
    <Container>
      <h1>Book an Appointment</h1>
      {Object.keys(availabilities).map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {availabilities[day].map((slot, index) => (
              <li key={index}>
                {new Date(slot.availability_start).toLocaleTimeString()} - {new Date(slot.availability_end).toLocaleTimeString()}
                <Button onClick={() => console.log(`Booking appointment for ${day} at ${slot.availability_start}`)}>
                  Book
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default BookAppointment;
