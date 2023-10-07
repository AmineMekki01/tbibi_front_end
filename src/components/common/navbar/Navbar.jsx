import React, { useContext } from 'react';
import {
  NavbarContainer,
  LogoContainer,
  MenuList,
  MenuItem,
  LogoutItem,
} from './MyNavbar.styles';
import { AuthContext } from './../../Auth/AuthContext';

const MyNavbar = () => {
  const { isLoggedIn, logout, doctorId, patientId, userType } = useContext(AuthContext); 

  console.log('Is Logged In:', isLoggedIn);

  const profileHref = userType === 'doctor'
    ? `/DoctorProfile/${doctorId}`
    : `/PatientProfile/${patientId}`;  

  const menus = isLoggedIn
    ? [
        { title: 'Search', src: 'Search', href: '/SearchBar' },
        { title: 'DashBoard', src: 'Chart', href: '/DashBoard' },
        {
          title: 'Profile',
          src: 'Chart_fill',
          href: profileHref, 
        },
        { title: 'Appointment', src: 'Calendar', href: '/patient-appointments' },
        { title: 'MyDocs', src: 'User', href: '/MyDocs' },
        { title: 'Messages ', src: 'Chat', href: '/Messages' },
        { title: 'ChatBot', src: 'Chat', href: '/ChatBot' },
      ]
    : [
        { title: 'Home', src: 'Search', href: '/HomePage' },
        { title: 'Login', src: 'Chart', href: '/login' },
        { title: 'Register', src: 'Calendar', href: '/register' },
      ];

  return (
    <NavbarContainer>
      <LogoContainer>
        <img
          src={require('./../../../assets/images/logo_doc_app_white.png')}
          alt="logo"
        />
      </LogoContainer>
      <MenuList>
        {menus.map((menu, index) => (
          <MenuItem key={index} gap={menu.gap} firstItem={index === 0}>
            <img
              src={require(`./../../../assets/images/menu_images/${menu.src}.png`)}
              alt={menu.title}
            />
            <a href={menu.href}>{menu.title}</a>
          </MenuItem>
        ))}
      </MenuList>
      <LogoutItem>
                {isLoggedIn && (
                    <>
                        <img src={require(`./../../../assets/images/menu_images/Chart.png`)} alt="Logout" />
                        <a href="/login" onClick={logout}>Logout</a>  {/* Call the logout function when the link is clicked */}
                    </>
                )}
            </LogoutItem>
    </NavbarContainer>
  );
};


export default MyNavbar;
