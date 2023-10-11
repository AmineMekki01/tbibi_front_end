import React, { useState, useEffect } from 'react';

import stetoImage from "./../assets/images/no_background_doc_steto.png";
import stetoImageSized from "./../assets/images/no_small_background_doc_steto.png";

import styled from 'styled-components';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  padding-top: 0;
  `;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: none;
  border: 1px solid red;
`;

const HeaderText = styled.div`
  width: 50%;
  padding: 1rem;
  height: 100%;
  @media (max-width: 550px) {
    width: 70%;
  }
`;

const HeaderMedia = styled.div`
  width: 50%;
  height: 100%;
  img {
    max-width: 90%;  
    height: auto;     
  }
  @media (max-width: 550px) {
    width: 30%;
    padding: 10px 10px 10px 0;
  }

`;

const MainTitle = styled.p`
  width: 90%;
  margin: 0 auto;
  font-size: 3vw;
  @media (max-width: 750px) {
    font-size: 2rem;

  }
`;

const Mainpara = styled.p`
  width: 90%;
  margin: 0 auto;
  font-size: 1.5vw;
  @media (max-width: 750px) {
    font-size: 1rem;

  }
`;

const Services = styled.div`
  display: flex;  
  width: 100%;
  justify-content: center;  
  align-items: stretch;
  flex-wrap: wrap;  
  padding: 1rem;
  height: 100%;
  min-height: 500px;
  border: 1px solid blue;

`;

const Service = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
 
`;

const ServiceIcon = styled.div`
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  img {
    max-width: 200px;  
    height: 200px;     
  }
`;

const ServiceTitle = styled.p`
  max-width: 200px;
  font-size: 2rem; 
  font-weight: bold;  
  text-align: center;
`;

const ServiceDescription = styled.p`
  width: 100%;
  max-width: 200px;
  font-size: 1rem;
  min-font-size: 1rem;
  text-align: center;
`;


function HomePage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 550);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 550);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const imageSource = isSmallScreen ? stetoImageSized : stetoImage;

  return (
    <PageContainer className='pt-6 space-y-4'>

      <HeaderContainer>
        <HeaderText>
          <MainTitle>Finding a doctor you can build a good relationship with is good for your health.</MainTitle>
          <Mainpara>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Mainpara> 
        </HeaderText>

        <HeaderMedia>
          <img src={imageSource} alt="Doctor" />

        </HeaderMedia>

      </HeaderContainer>
      
      <Services>

        <MainTitle className='flex justify-center'>What We Have For You</MainTitle>

        <Service>
          <ServiceIcon>
            <img src={stetoImageSized} alt="Doctor" />
          </ServiceIcon>
          <ServiceTitle>Service 1</ServiceTitle>
          <ServiceDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada lorem maximus mauris scelerisque, at rutrum nulla
            dictum.
          </ServiceDescription>
        </Service>

        <Service>
          <ServiceIcon>
            <img src={stetoImageSized} alt="Doctor" />
          </ServiceIcon>
          <ServiceTitle>Service 2</ServiceTitle>
          <ServiceDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada lorem maximus mauris scelerisque, at rutrum nulla
            dictum.
          </ServiceDescription>
        </Service>
        
        <Service>
          <ServiceIcon>
            <img src={stetoImageSized} alt="Doctor" />
          </ServiceIcon>
          <ServiceTitle>Service 3</ServiceTitle>
          <ServiceDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada lorem maximus mauris scelerisque, at rutrum nulla
            dictum.
          </ServiceDescription>
        </Service>

      </Services>
    </PageContainer>
  );
}

export default HomePage;
