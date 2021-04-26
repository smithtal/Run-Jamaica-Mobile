import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {refreshCredentials} from '../../services/auth';

import {AuthContext} from './auth.context';

export interface AuthWrapperProps {
  renderWhenAuthenticated: () => React.ReactNode;
  renderWhenUnauthenticated: () => React.ReactNode;
}

const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

export const AuthWrapper: React.FunctionComponent<AuthWrapperProps> = props => {
  const [accessToken, setAccessToken] = React.useState<string>();
  const [refreshToken, setRefreshToken] = React.useState<string>();

  const {renderWhenAuthenticated, renderWhenUnauthenticated} = props;

  React.useEffect(() => {
    const authenticateWithStoredCredentials = async (): Promise<void> => {
      try {
        const storedRefreshToken = await EncryptedStorage.getItem(
          REFRESH_TOKEN_STORAGE_KEY,
        );
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
          const {accessToken} = await refreshCredentials(storedRefreshToken);
          setAccessToken(accessToken);
        }
      } catch (error) {
        console.error(
          `Error refreshing existing credentials: ${error.message}`,
        );
        await EncryptedStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        setAccessToken(undefined);
        setRefreshToken(undefined);
      }
    };

    authenticateWithStoredCredentials();
  }, []);

  React.useEffect(() => {
    const storeRefreshToken = async () => {
      try {
        await EncryptedStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          refreshToken!,
        );
      } catch (error) {
        //TODO: This should trigger an error message and push to the home screen.
        console.error(`Error storing refresh credentials: ${error.message}`);
        setAccessToken(undefined);
        setRefreshToken(undefined);
      }
    };

    if (refreshToken) {
      storeRefreshToken();
    }
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
      }}>
      {accessToken ? renderWhenAuthenticated() : renderWhenUnauthenticated()}
    </AuthContext.Provider>
  );
};
