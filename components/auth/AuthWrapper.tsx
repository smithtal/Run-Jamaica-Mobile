import React from 'react';
import {AuthContext} from './auth.context';

export interface AuthWrapperProps {
  renderWhenAuthenticated: () => React.ReactNode;
  renderWhenUnauthenticated: () => React.ReactNode;
}

export function AuthWrapper(props: AuthWrapperProps): JSX.Element {
  const [accessToken, setAccessToken] = React.useState<string | undefined>();
  const [refreshToken, setRefreshToken] = React.useState<string | undefined>();

  const {renderWhenAuthenticated, renderWhenUnauthenticated} = props;

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
}
