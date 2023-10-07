import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    LinearProgress,
  } from '@mui/material';
  
  import {
    Instagram as InstagramIcon,
    Twitter as TwitterIcon,
    Facebook as FacebookIcon,
    Language as GlobeIcon,
  } from '@mui/icons-material';
  

import profilePhoto from './../../../assets/images/profile_photo.jpeg';
import { useParams } from 'react-router-dom';
import BookAppointment from '../Patient/BookAppointment'; 

export default function DoctorProfile() {

  const { doctorId } = useParams();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/doctors/${doctorId}`)
        .then(response => {
            setDoctorInfo(response.data);
            setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);  
          setError('An error occurred while fetching the doctor information.');
      });
}, [doctorId]);


  return (
    <section style={{ backgroundColor: '#eee' }}>
      {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {doctorInfo && (
      <Container className="py-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          <Grid item lg={4}>
            <Card className="mb-4">
              <CardContent className="text-center">
                <CardMedia
                  component="img"
                  image={profilePhoto}
                  title="avatar"
                  className="rounded-circle"
                  style={{ width: '150px', margin: 'auto' }}
                />
               
                    <Typography className="text-muted mb-1" variant="subtitle1">
                      Name : {doctorInfo.first_name} {doctorInfo.last_name}
                    </Typography>
                    <Typography className="text-muted mb-1" variant="subtitle1">
                      Specialty : {doctorInfo.specialty}
                    </Typography>

                    <div className="d-flex justify-content-center mb-2">
                      <Button variant="contained">Follow</Button>
                      <Button variant="outlined" className="ms-1">Message</Button>
                    </div>
                 
              </CardContent>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <CardContent className="p-0">
                <List>
                  {[
                    { icon: <GlobeIcon color="secondary" />, text: 'https://mdbootstrap.com', color: 'text-warning' },
                    { icon: <TwitterIcon />, text: '@mdbootstrap', color: '#55acee' },
                    { icon: <InstagramIcon />, text: 'mdbootstrap', color: '#ac2bac' },
                    { icon: <FacebookIcon />, text: 'mdbootstrap', color: '#3b5998' },
                  ].map((item, index) => (
                    <ListItem key={index} className="d-flex justify-content-between align-items-center p-3">
                      <ListItemIcon style={{ color: item.color }}>{item.icon}</ListItemIcon>
                      <ListItemText>
                        <Typography>{item.text}</Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8}>
                <Card className="mb-4">
                  <CardContent>
                 
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Full Name</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {doctorInfo.first_name} {doctorInfo.last_name}
                                      </Typography>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Email</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {doctorInfo.email}
                                      </Typography>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Phone</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {doctorInfo.phone_number}
                                      </Typography>
                                  </Grid>
                              </Grid>
                             
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Address</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {doctorInfo.street_name_number} , {doctorInfo.city}, {doctorInfo.state_name} {doctorInfo.zip_code}, {doctorInfo.country}
                                      </Typography>
                                  </Grid>
                              </Grid>
                  
                  </CardContent>
                </Card>

                <Grid container spacing={3}>
                    {['Project Status 1', 'Project Status 2'].map((statusTitle, index) => (
                        <Grid item md={6} key={index}>
                            <Card className="mb-4 mb-md-0">
                                <CardContent>
                                    <Typography className="mb-4">
                                        <span className="text-primary font-italic me-1">assignment</span> {statusTitle}
                                    </Typography>
                                    {['Web Design', 'Website Markup', 'One Page', 'Mobile Template', 'Backend API'].map((task, idx) => (
                                        <React.Fragment key={idx}>
                                            <Typography className="mb-1" style={{ fontSize: '.77rem' }}>{task}</Typography>
                                            <LinearProgress variant="determinate" value={Math.random() * 100} className="mb-3" />
                                        </React.Fragment>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                
                <Card>
                    <CardContent>
                        <Typography className="center">
                            Book Appointment
                        </Typography>
                        <BookAppointment />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
      </Container>
      )}
    </section>
  );
}
