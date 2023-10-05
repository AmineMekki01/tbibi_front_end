import React from 'react'
import { Title , Container  , Flex , Line } from './../components/Appointments/styles/AppointmentDashboard.styles'
import CardCom from '../components/Appointments/AppointmentCard'

export default function Dashboard() {
  return (
    <Container>
        <Title>My Upcoming Appointments</Title>
        <Flex>
          {/* // This dates and durations will be fetched from the appointment table in the database.*/} 
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"} doctor_name={"Amine MEKKI"}  doctor_specialty={"Neurology"}/>  
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Adnane ZERGGIT"}  doctor_specialty={"Internal Medicine"}/>
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Ayoub KASSI"}  doctor_specialty={"Nephrology"}/>
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Amine MEKKI"}  doctor_specialty={"Neurology"}/>  
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Adnane ZERGGIT"}  doctor_specialty={"Internal Medicine"}/>
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Ayoub KASSI"}  doctor_specialty={"Nephrology"}/>
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Amine MEKKI"}  doctor_specialty={"Neurology"}/>  
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Adnane ZERGGIT"}  doctor_specialty={"Internal Medicine"}/>
          <CardCom duration={30} appointment_start={"24/09/2023 14:00:00"} appointment_finish={"24/09/2023 14:30:00"}  doctor_name={"Ayoub KASSI"}  doctor_specialty={"Nephrology"}/>
        </Flex>
    </Container>
  )

}