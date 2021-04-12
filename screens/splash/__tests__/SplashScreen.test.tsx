import React from 'react';
import SplashScreen from '../SplashScreen';

import {fireEvent, render} from '@testing-library/react-native';

describe('Splash Screen', () => {
  const navigationMock = {
    navigate: jest.fn(),
  } as any;

  it('renders correctly', () => {
    render(<SplashScreen navigation={navigationMock} />);
  });

  it('navigates to the sign up page when the `SIGN UP` button is clicked', () => {
    const {getByText} = render(<SplashScreen navigation={navigationMock} />);
    fireEvent.press(getByText('SIGN UP'));
    expect(navigationMock.navigate).toBeCalledWith('SignUp');
  });

  it('navigates to the sign in page when the `Sign in` link is clicked', () => {
    const {getByText} = render(<SplashScreen navigation={navigationMock} />);
    fireEvent.press(getByText('Sign in'));
    expect(navigationMock.navigate).toBeCalledWith('SignIn');
  });
});
