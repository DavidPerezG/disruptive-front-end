import React, { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

// Estilo para el contenedor de la página de registro
const RegisterPageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

// Estilo para el título de la página de registro
const RegisterPageTitle = styled.h2`
  text-align: center;
`;

// Estilo para el formulario de registro
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// Estilo para los campos del formulario
const FormField = styled.div`
  margin-bottom: 20px;
`;

// Estilo para etiquetas de campo
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

// Estilo para campos de entrada
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Estilo para el botón de registro
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #04AA6D;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #038055;
  }
`;

// Estilo para el contenedor de los botones de tipo de usuario
const UserTypeButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Estilo para los botones de tipo de usuario
const UserTypeButton = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#04AA6D' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#038055' : '#f2f2f2')};
  }
`;

// Estilo para el mensaje de error
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

function RegisterPage() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'reader' // Default user type is 'reader'
  });
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setUserData({ ...userData, userType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await registerUser(userData);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      // Set the error message state variable
      setErrorMessage(error.message);
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterPageTitle>Registro</RegisterPageTitle>
      <RegisterForm onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="username">Nombre de Usuario:</Label>
          <Input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} required />
        </FormField>
        <UserTypeButtonsContainer>
          <UserTypeButton type="button" active={userData.userType === 'reader'} onClick={() => handleUserTypeChange('reader')}>Lector</UserTypeButton>
          <UserTypeButton type="button" active={userData.userType === 'creator'} onClick={() => handleUserTypeChange('creator')}>Creador</UserTypeButton>
        </UserTypeButtonsContainer>
        <SubmitButton type="submit">Registrarse</SubmitButton>
      </RegisterForm>
      {/* Render the error message if exists */}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RegisterPageContainer>
  );
}

export default RegisterPage;
