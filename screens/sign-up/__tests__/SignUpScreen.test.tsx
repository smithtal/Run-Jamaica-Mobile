import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native';
import * as authServices from '../../../services/auth';
import SignUpScreen from '../SignUpScreen';
import {AuthContext} from '../../../components/auth/auth.context';

describe('SignUpScreen', () => {
  let authContextSetAccessTokenSpy: jest.Mock<string, any>;
  let authContextSetRefreshTokenSpy: jest.Mock<string, any>;
  let signUpSpy: jest.SpyInstance<
    Promise<authServices.AuthResponse>,
    [authServices.SignupRequestBody]
  >;

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

  const testFirstName = 'Test';
  const testLastName = 'User';
  const testEmailAddress = 'test@example.net';
  const testPassword = 'Password123';

  const completeForm = (
    wrapper: RenderAPI,
    {
      firstName = testFirstName,
      lastName = testLastName,
      emailAddress = testEmailAddress,
      password = testPassword,
      confirmPassword = testPassword,
    } = {},
  ) => {
    const {getByText, getByPlaceholderText} = wrapper;

    fireEvent(getByPlaceholderText('First Name'), 'onChangeText', firstName);

    fireEvent(getByPlaceholderText('Last Name'), 'onChangeText', lastName);

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
    signUpSpy = jest.spyOn(authServices, 'signup').mockImplementationOnce(
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
        firstName: 'Test',
        lastName: 'User',
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
      .mockRejectedValueOnce({response: {status: 409}});

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

  describe('Form validation', () => {
    describe('Name', () => {
      it('shows an error message when `firstName` is missing', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const firstNameInput = getByPlaceholderText('First Name');

        fireEvent(firstNameInput, 'onFocus');
        fireEvent(firstNameInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Name is required.'));
        });
      });

      it('shows an error message when name is longer than 256 characters', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const nameInput = getByPlaceholderText('First Name');

        fireEvent(nameInput, 'onChangeText', 'T'.repeat(256));
        fireEvent(nameInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Name is too long.'));
        });
      });

      it('does not show an error when `lastName` is missing', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText} = wrapper;

        const lastNameInput = getByPlaceholderText('Last Name');

        fireEvent(lastNameInput, 'onFocus');
        fireEvent(lastNameInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(lastNameInput.props.style.borderColor).toBe('#C4C4C4');
        });
      });
    });
    describe('Email Address', () => {
      it('shows an error message when an email address is missing', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const emailAddressInput = getByPlaceholderText('Email');

        fireEvent(emailAddressInput, 'onChangeText', '');
        fireEvent(emailAddressInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Email address is required.'));
        });
      });
      it('shows an error message when an invalid email address is provided', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const emailAddressInput = getByPlaceholderText('Email');

        fireEvent(emailAddressInput, 'onChangeText', 'test@example,com');
        fireEvent(emailAddressInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Email address is invalid.')).toBeDefined();
        });
      });
    });
    describe('Password', () => {
      it('shows an error message if the password is missing', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const passwordInput = getByPlaceholderText('Password');

        fireEvent(passwordInput, 'onChangeText', '');
        fireEvent(passwordInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Password is required.')).toBeDefined();
        });
      });
    });
    describe('Confirm Password', () => {
      it('shows an error message if confirm password is missing', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const confirmPasswordInput = getByPlaceholderText('Confirm Password');

        fireEvent(confirmPasswordInput, 'onChangeText', '');
        fireEvent(confirmPasswordInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Confirm Password is required.')).toBeDefined();
        });
      });
      it('shows an error message if password and confirmation do not match', async () => {
        const wrapper = renderForm();
        const {getByPlaceholderText, getByText} = wrapper;

        const passwordInput = getByPlaceholderText('Password');
        const confirmPasswordInput = getByPlaceholderText('Confirm Password');

        fireEvent(passwordInput, 'onChangeText', 'Password123');
        fireEvent(passwordInput, 'onBlur', {target: {}});

        fireEvent(confirmPasswordInput, 'onChangeText', 'Password345');
        fireEvent(confirmPasswordInput, 'onBlur', {target: {}});

        await waitFor(() => {
          expect(getByText('Must match password.')).toBeDefined();
        });
      });
    });
  });
});
