import React from 'react';
import { NavbarContainer, LogoContainer, MenuList, MenuItem, LogoutItem } from './MyNavbar.styles';

const MyNavbar = () => {
  const menus = [
    { title: "Search", src: "Search", href:"/SearchBar"},
    { title: "DashBoard", src : "Chart", href:"/"},
    { title: "Profile", src: "Chart_fill", href:"/" },
    { title: "Appointment", src: "Calendar", href:"/patient-dashboard" },
    { title: "MyDocs", src: "User", href:"/" },
    { title: "Messages ", src: "Chat", href:"/" },
    { title: "ChatBot", src: "Chat", href:"/" },
  ];

  return (
    <NavbarContainer>
      <LogoContainer>
        <img
          src={require("./../../../assets/images/logo_doc_app_white.png")}
          alt="logo"
        />
      </LogoContainer>
      <MenuList>
        {menus.map((menu, index) => (
          <MenuItem key={index} gap={menu.gap} firstItem={index === 0}>
            <img src={require(`./../../../assets/images/menu_images/${menu.src}.png`)} alt={menu.title} />
            <a href={menu.href}>{menu.title}</a>
          </MenuItem>
        ))}
        
      </MenuList>
      <LogoutItem>
        <img src={require(`./../../../assets/images/menu_images/Chart.png`)} alt="Logout" />
        <a href="/Login">Logout</a>
      </LogoutItem>
    </NavbarContainer>
  );
};

export default MyNavbar;
