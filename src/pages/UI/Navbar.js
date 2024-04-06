import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Estilo para la barra de navegación
const NavbarContainer = styled.div`
  background-color: #333;
  overflow: hidden;
`;

// Estilo para los enlaces de navegación
const NavItem = styled(Link)`
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 17px;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

function Navbar({ isLoggedIn, handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <NavbarContainer>
      {isLoggedIn ? (
        <>
          <NavItem to="/">Inicio</NavItem>
          <NavItem to="/categories">Explorar Categorías</NavItem>
          <NavItem to="/content">Explorar Contenido</NavItem>
          <NavItem to="/profile">Perfil de Usuario</NavItem>
          <NavItem to="#" onClick={handleLogoutClick}>Cerrar Sesión</NavItem>
        </>
      ) : (
        <>
          <NavItem to="/login">Iniciar Sesión</NavItem>
          <NavItem to="/register">Registrarse</NavItem>
          <NavItem to="/categories">Explorar Categorías</NavItem>
        </>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
