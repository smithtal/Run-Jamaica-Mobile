import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import useNetwork from '../../hooks/useNetwork';
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

  const [{status, data}, triggerRefresh] = useNetwork<
    {accessToken: string},
    string
  >(refreshCredentials);

  React.useEffect(() => {
    const authenticateWithStoredCredentials = async (): Promise<void> => {
      try {
        const storedRefreshToken = await EncryptedStorage.getItem(
          REFRESH_TOKEN_STORAGE_KEY,
        );
        if (storedRefreshToken) {
          await triggerRefresh(storedRefreshToken);
        }
      } catch (error) {
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
        setAccessToken(undefined);
        setRefreshToken(undefined);
      }
    };

    if (refreshToken) {
      storeRefreshToken();
    }
  }, [refreshToken]);

  const retrievedAccessToken = data?.accessToken;
  React.useEffect(() => {
    const handleRefreshComplete = async () => {
      if (status === 'complete') {
        setAccessToken(retrievedAccessToken);
      } else if (status === 'error') {
        await EncryptedStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        setAccessToken(undefined);
        setRefreshToken(undefined);
      }
    };
    handleRefreshComplete();
  }, [status, retrievedAccessToken]);

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
