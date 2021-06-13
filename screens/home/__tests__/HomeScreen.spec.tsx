import {render} from '@testing-library/react-native';
import React from 'react';
import {AuthContext} from '../../../components/auth/auth.context';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  //{ firstName: Test, lastName: User }
  const TEST_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJVc2VyIn0.RDFpSpQeq5-a7cbHsaYo4VJicFHhBcriCFxaEK6F2vQ';

  const renderComponent = () => {
    return render(
      <AuthContext.Provider
        value={{
          accessToken: TEST_JWT,
          refreshToken: TEST_JWT,
          setAccessToken: () => null,
          setRefreshToken: () => null,
        }}>
        <HomeScreen />
      </AuthContext.Provider>,
    );
  };
  it('renders without crashing', () => {
    const {container} = renderComponent();
    expect(container).toBeDefined();
  });

  it('uses the name from the JWT to render a greeting', () => {
    const {getByText} = renderComponent();
    expect(getByText('Hi Test,')).toBeDefined();
  });
});
