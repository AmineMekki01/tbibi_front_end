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

    LinearProgress,
  } from '@mui/material';

import profilePhoto from './../../../assets/images/profile_photo.jpeg';
import { useParams } from 'react-router-dom';
import BookAppointment from './BookAppointment'; 

export default function PatientProfile() {

  const { patientId } = useParams();
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/patients/${patientId}`)
        .then(response => {
            setPatientInfo(response.data);
            setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);  
          setError('An error occurred while fetching the doctor information.');
      });
}, [patientId]);


  return (
    <section style={{ backgroundColor: '#eee' }}>
      {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {patientInfo && (
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
                      Name : {patientInfo.first_name} {patientInfo.last_name}
                    </Typography>
                    

                    <div className="d-flex justify-content-center mb-2">
                      <Button variant="contained">Follow</Button>
                      <Button variant="outlined" className="ms-1">Message</Button>
                    </div>
                 
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
                                          {patientInfo.first_name} {patientInfo.last_name}
                                      </Typography>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Email</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.email}
                                      </Typography>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Phone</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.phone_number}
                                      </Typography>
                                  </Grid>
                              </Grid>
                             
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Address</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.street_name_number} , {patientInfo.city}, {patientInfo.state_name} {patientInfo.zip_code}, {patientInfo.country}
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
