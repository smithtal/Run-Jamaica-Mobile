import React from 'react';

export interface AuthContextValue {
  accessToken?: string;
  refreshToken?: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const AuthContext = React.createContext<AuthContextValue>({
  setAccessToken: () => {},
  setRefreshToken: () => {},
});
