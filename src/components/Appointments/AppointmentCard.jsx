import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Line } from '../common/CalenderStyles/Summit.styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Flexi } from '../common/CalenderStyles/Calendar.styles';
import ShareIcon from '@mui/icons-material/Share';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function CardCom({duration, appointment_start, appointment_finish, doctor_name, doctor_specialty, userName, userAge, userType}) {
  return (
    <Card sx={{ minWidth: 200 , margin:"20px 10px" , boxShadow: '0px 0px 10px 5px rgba(128, 128, 128, 0.3)'}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {duration} Minute  
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="subtitle1" color="text.secondary" >
          - From <span className='font-bold'>{appointment_start}</span>, to <span className='font-bold'>{appointment_finish}</span> 
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
        <Button size="small">View Doctor Profile</Button>
      </CardActions>
      <Line />
      <Flexi>
        <div><ContentCopyIcon />Copy Link </div>
        <Button variant="contained" startIcon={<ShareIcon />}>
                Share
        </Button>
      </Flexi>
    </Card>
  )
}