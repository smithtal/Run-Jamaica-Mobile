import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native';
import * as authServices from '../../../services/auth';
import SignUpScreen from '../SignUpScreen';
import {AuthContext} from '../../../components/auth/auth.context';

describe('SignUpScreen', () => {
  let authContextSetAccessTokenSpy: jest.Mock<string, any>;
  let authContextSetRefreshTokenSpy: jest.Mock<string, any>;

  const renderForm = () => {
    return render(
      <AuthContext.Provider
        value={{
          setAccessToken: authContextSetAccessTokenSpy,
          setRefreshToken: authContextSetRefreshTokenSpy,
        }}>
        <SignUpScreen />
      </AuthContext.Provider>,
    );
  };

  const testName = 'Test User';
  const testEmailAddress = 'test@example.net';
  const testPassword = 'Password123';

  const completeForm = (
    wrapper: RenderAPI,
    {
      name = testName,
      emailAddress = testEmailAddress,
      password = testPassword,
      confirmPassword = testPassword,
    } = {},
  ) => {
    const {getByText, getByPlaceholderText} = wrapper;

    fireEvent(getByPlaceholderText('Name'), 'onChangeText', name);

    fireEvent(getByPlaceholderText('Email'), 'onChangeText', emailAddress);

    fireEvent(getByPlaceholderText('Password'), 'onChangeText', password);

    fireEvent(
      getByPlaceholderText('Confirm Password'),
      'onChangeText',
      confirmPassword,
    );

    fireEvent(getByText('SIGN UP'), 'onPress');
  };

  beforeEach(() => {
    authContextSetAccessTokenSpy = jest.fn();
    authContextSetRefreshTokenSpy = jest.fn();
  });

  it('renders without error', () => {
    renderForm();
  });

  it('when the form is completed and submitted the signup service is called', async () => {
    const signUpSpy = jest.spyOn(authServices, 'signup').mockImplementationOnce(
      (
        _signupRequestBody: authServices.SignupRequestBody,
      ): Promise<authServices.AuthResponse> => {
        return Promise.resolve({
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        });
      },
    );

    const wrapper = renderForm();

    completeForm(wrapper);

    await waitFor(() => {
      expect(signUpSpy).toHaveBeenCalledWith({
        name: 'Test User',
        emailAddress: 'test@example.net',
        password: 'Password123',
        confirmPassword: 'Password123',
      });
      expect(authContextSetAccessTokenSpy).toHaveBeenCalledWith('accessToken');
      expect(authContextSetRefreshTokenSpy).toHaveBeenCalledWith(
        'refreshToken',
      );
    });
  });

  it('shows an error message saying the email address is taken when the service returns a status of 409', async () => {
    jest
      .spyOn(authServices, 'signup')
      .mockRejectedValue({response: {status: 409}});

    const wrapper = renderForm();

    completeForm(wrapper);

    const {getByText} = wrapper;

    await waitFor(() => {
      expect(getByText('This email address is already registered.'));
    });
  });

  it('shows a general error message when the service throws an exception', async () => {
    jest
      .spyOn(authServices, 'signup')
      .mockRejectedValue({response: {status: 500}});

    const wrapper = renderForm();

    completeForm(wrapper);

    const {getByText} = wrapper;

    await waitFor(() => {
      expect(getByText('Unable to sign up, try again later.'));
    });
  });
});
