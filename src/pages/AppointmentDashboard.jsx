import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Title, Container, Flex } from './../components/Appointments/styles/AppointmentDashboard.styles';
import CardCom from '../components/Appointments/AppointmentCard';

export default function Dashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/reservations')
        .then(response => {
            console.log(response.data);  // Log the response data to the console
            setReservations(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}, []);

  return (
      <Container>
          <Title>My Upcoming Appointments</Title>
          <Flex>
              {reservations.map(reservation => (
                  <CardCom
                      key={reservation.reservation_id}
                      duration={30} 
                      appointment_start={reservation.reservation_start}
                      appointment_finish={reservation.reservation_end}
                      doctor_name={reservation.first_name+" "+reservation.last_name} 
                      doctor_specialty={reservation.specialty} 
                  />
              ))}
          </Flex>
      </Container>
  );
}