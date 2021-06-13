import React, {useContext} from 'react';
import {AuthContext} from '../../components/auth/auth.context';
import jwtDecode from 'jwt-decode';
import {JwtPayload} from '../../types/jwt-payload';
import HomeScreenView from './HomeScreen.view';

function HomeScreen() {
  const {accessToken} = useContext(AuthContext);

  if (!accessToken) {
    return null;
  }

  const decodedToken = jwtDecode<JwtPayload>(accessToken);

  const name = decodedToken.firstName;

  return <HomeScreenView name={name} />;
}

export default HomeScreen;
