// HomePage.js

import React from 'react';
import Navbar from '../UI/Navbar';
import styled from 'styled-components';

// Estilo para el contenedor de la página principal
const LandingPageContainer = styled.div`
  padding: 20px;
`;

// Estilo para el mensaje de bienvenida
const WelcomeMessage = styled.h1`
  color: #333;
`;

function LandingPage() {
  return (
    <>
      <LandingPageContainer>
        <WelcomeMessage>Bienvenido a la Página Principal</WelcomeMessage>
      </LandingPageContainer>
    </>
  );
}

export default LandingPage;
