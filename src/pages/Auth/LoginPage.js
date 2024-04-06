import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../services/authService'; // Import logoutUser function

// Estilo para el contenedor de la página de inicio de sesión
const LoginPageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const LoginPageTitle = styled.h2`
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

function LoginPage({ setIsLoggedIn }) {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!userData.username || !userData.password) {
      setErrorMessage('Both username and password are required');
      return;
    }
    try {
      const token = await loginUser(userData);
      alert('Login successful!');
      // Call logoutUser to remove authToken when user logs in
      // Set isLoggedIn to true after successful login
      setIsLoggedIn(true);
      // Redirect the user to the dashboard or any other page after successful login
      navigate('/landing');
    } catch (error) {
      console.error('Error logging in:', error);
      // Set the error message state variable
      setErrorMessage(error);
    }
  };

  return (
    <LoginPageContainer>
      <LoginPageTitle>Iniciar Sesión</LoginPageTitle>
      <LoginForm onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="username">Nombre de Usuario:</Label>
          <Input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} required />
        </FormField>
        <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
      </LoginForm>
      {/* Render the error message if exists */}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LoginPageContainer>
  );
}

export default LoginPage;
