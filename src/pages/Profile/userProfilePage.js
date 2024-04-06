import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserById } from '../../services/userServices';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authTokenFromCookie = Cookies.get('authToken');
    const idUserFromCookie = Cookies.get('userId');

    const fetchUser = async () => {
      try {
        let userData = await getUserById(idUserFromCookie, authTokenFromCookie);
        setUser(userData.data);
        console.log(userData.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="user-profile">
      {loading ? (
        <p>Cargando...</p>
      ) : user ? (
        <>
          <h1>Perfil de Usuario</h1>
          <p><strong>Nombre de Usuario:</strong> {user.username}</p>
          <p><strong>Correo Electrónico:</strong> {user.email}</p>
          <p><strong>Tipo de Usuario:</strong> {user.userType}</p>
          <p><strong>Creado en:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </>
      ) : (
        <p>No se pudo cargar la información del usuario.</p>
      )}
    </div>
  );
};

export default UserProfile;
