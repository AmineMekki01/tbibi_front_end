import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Breadcrumbs,
    Link,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    LinearProgress,
  } from '@mui/material';
  
  import {
    GitHub as GitHubIcon,
    Instagram as InstagramIcon,
    Twitter as TwitterIcon,
    Facebook as FacebookIcon,
    Language as GlobeIcon,
  } from '@mui/icons-material';
  

import profilePhoto from './../../../assets/images/profile_photo.jpeg';
import { useParams } from 'react-router-dom';



export default function ProfilePage() {
    const {doctor_user_name} = useParams();

    console.log(doctor_user_name);
  return (
    <section style={{ backgroundColor: '#eee' }}>



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
                  Full Stack Developer
                </Typography>
                <Typography className="text-muted mb-4" variant="body2">
                  Bay Area, San Francisco, CA
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
                    { icon: <GitHubIcon />, text: 'mdbootstrap', color: '#333333' },
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
                        {['Full Name', 'Email', 'Phone', 'Mobile', 'Address'].map((label, index) => (
                            <Grid container spacing={3} key={index}>
                                <Grid item sm={3}>
                                    <Typography>{label}</Typography>
                                </Grid>
                                <Grid item sm={9}>
                                    <Typography className="text-muted">
                                        {/* Replace the following line with your data fetching logic */}
                                        {label} data
                                    </Typography>
                                </Grid>
                                {index < 4 && <hr />}
                            </Grid>
                        ))}
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
            </Grid>
        </Grid>
      </Container>
    </section>
  );
}
