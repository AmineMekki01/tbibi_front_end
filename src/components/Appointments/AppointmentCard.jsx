import * as React from 'react';
import { createEvent } from 'ics';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Line } from '../common/CalenderStyles/Summit.styles';

import { Flexi } from '../common/CalenderStyles/Calendar.styles';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function CardCom({duration, appointment_start, appointment_finish, doctor_name, doctor_specialty, userName, userAge, userType, doctorId}) {

  // Prepare the data to share
  const prepareDataToShare = () => {
    const data = `
      Duration: ${duration} Minutes
      Day: ${appointment_start.split("T")[0]}
      TimeSlot: From ${appointment_start.split("T")[1]} to ${appointment_finish.split("T")[1]}
      Doctor Name: ${doctor_name}
      Doctor Specialty: ${doctor_specialty}
    `;
    return data;
  }

  // Create an ICS file so as the user can add the appointment to his calendar
  const createICSFile = () => {
    const start = appointment_start.split("T")[0].split('-').map(Number);
    const end = appointment_finish.split("T")[0].split('-').map(Number);
  
    createEvent({
      start,
      end,
      title: `Appointment with ${doctor_name}`,
      description: prepareDataToShare(),
    }, (error, value) => {
      if (error) {
        console.log("Error in createEvent:", error);
        return;
      }
      console.log("Generated ICS value:", value);
  
      // Creating blob from the ICS string
      const blob = new Blob([value], { type: 'text/calendar' });
  
      // Creating an object URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Creating a temporary anchor tag and simulate a click
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `appointment_with_${doctor_name}.ics`;
  
      // Append the anchor to the DOM to start the download when the button is clicked
      document.body.appendChild(a);
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };

  const shareData = () => {
    const dataToShare = prepareDataToShare();

    if (navigator.share) {
      navigator.share({
        title: `Appointment with ${doctor_name}`,
        text: dataToShare,
      })
      .then(() => {
        console.log('Thanks for sharing!');
      })
      .catch((error) => {
        console.log('Something went wrong, couldn\'t share', error);
      });
    } else {
      navigator.clipboard.writeText(dataToShare).then(() => {
        console.log('Data copied to clipboard');
      }).catch((err) => {
        console.log('Could not copy text: ', err);
      });
    }
  }

  const navigate = useNavigate(); // <--- instantiate useHistory

  // Navigate to Doctor Profile
  const goToDoctorProfile = () => {
    navigate(`/DoctorProfile/${doctorId}`);
  };
  return (
    <Card sx={{ minWidth: 200 , margin:"20px 10px" , boxShadow: '0px 0px 10px 5px rgba(128, 128, 128, 0.3)'}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {duration} Minute  
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
          - Day :  <span className='font-bold'>{appointment_start.split("T")[0]}</span>

        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
          - TimeSlot :  From : <span className='font-bold'>{appointment_start.split("T")[1]}</span>
  
          <br/>
          to <span className='font-bold'>{appointment_finish.split("T")[1]}</span> 
        </Typography>
        {userType === 'doctor' ? (
          <React.Fragment>
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
              - Patient Name : {userName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
              - Patient Age : {userAge}
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
              - Doctor Name : {doctor_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
              - Doctor Specialty : {doctor_specialty}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToDoctorProfile}>View Doctor Profile</Button>
      </CardActions>
      <Line />
      <Flexi>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={createICSFile}>
         ICS
      </Button>
        <Button variant="contained" startIcon={<ShareIcon />} onClick={shareData}>
          Share
        </Button>
      </Flexi>
    </Card>
  )
}