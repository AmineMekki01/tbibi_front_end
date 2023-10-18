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

export default function PatientProfile() {

  const { patientId } = useParams();
  console.log("Patient ID from React:", patientId);

  const [patientInfo, setPatientInfo] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/patients/${patientId}`)
        .then(response => {
            setPatientInfo(response.data);
            setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);  
          setError('An error occurred while fetching the patient information.');
      });
}, [patientId]);


  return (
    <section style={{ backgroundColor: '#eee', padding:"20px", height:"100vh"}}>
      {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {patientInfo && (
      <Container className="py-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          <Grid item lg={4}>
            <Card className="mb-2">
              <CardContent className="text-center">
                <CardMedia
                  component="img"
                  image={profilePhoto}
                  title="avatar"
                  className="rounded-circle"
                  style={{ width: '150px', margin: 'auto' }}
                />
               
                    <Typography className="text-muted mb-1" variant="subtitle1">
                      Name : {patientInfo.FirstName} {patientInfo.LastName}
                    </Typography>
                    <Typography className="text-muted mb-1" variant="subtitle1">
                      BirthDay : {patientInfo.BirthDate}
                    </Typography>
                    
                    

                    <div className="d-flex justify-content-center mb-2">
                      <Button variant="contained">Follow</Button>
                      <Button variant="outlined" className="ms-1">Message</Button>
                    </div>
                 
              </CardContent>
            </Card>

          
          </Grid>
          <Grid item lg={8}>
                <Card className="mb-2">
                  <CardContent>
                 
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Full Name</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.FirstName} {patientInfo.LastName}
                                      </Typography>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Email</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.Email}
                                      </Typography>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Phone</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.PhoneNumber}
                                      </Typography>
                                  </Grid>
                              </Grid>
                             
                              <Grid container spacing={3}>
                                  <Grid item sm={3}>
                                      <Typography>Address</Typography>
                                  </Grid>
                                  <Grid item sm={9}>
                                      <Typography className="text-muted">
                                          {patientInfo.location}  
                                      </Typography>
                                  </Grid>
                              </Grid>
                  
                  </CardContent>
                </Card>
                <Card className='mb-2'>
                  <CardContent>
                    <Typography variant="h5" className="mb-3">Get to know me : </Typography>
                    <Typography className="text-muted mb-3">
                      {patientInfo.PatientBio}
                    </Typography>
                  </CardContent>
                </Card>
                <Grid container spacing={3}>
                    {['Project Status 1', 'Project Status 2'].map((statusTitle, index) => (
                        <Grid item md={6} key={index}>
                            <Card className="mb-2 mb-md-0">
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

                
            
            </Grid>
        </Grid>
      </Container>
      )}
    </section>
  );
}
