import React from 'react';
import {AuthResponse, signup, SignupRequestBody} from '../../services/auth';
import {AuthContext} from '../../components/auth/auth.context';
import useNetwork from '../../hooks/useNetwork';
import SignUpScreenView from './SignUpScreen.view';

function SignUpScreen(): JSX.Element {
  const {setAccessToken, setRefreshToken} = React.useContext(AuthContext);

  const [signInStatus, triggerSignIn] = useNetwork<
    AuthResponse,
    SignupRequestBody
  >(signup);

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleFormSubmit = async (fields: SignupRequestBody) => {
    await triggerSignIn(fields);
  };

  React.useEffect(() => {
    const {status, data, error} = signInStatus;

    if (status === 'complete') {
      setAccessToken(data?.accessToken!);
      setRefreshToken(data?.refreshToken!);
    } else if (status === 'error') {
      if (error.response && error.response.status === 409) {
        setErrorMessage(`This email address is already registered.`);
      } else {
        setErrorMessage(`Unable to sign up, try again later.`);
      }
    }
  }, [signInStatus.status]);

  return (
    <SignUpScreenView
      errorMessage={errorMessage}
      signInStatus={signInStatus.status}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default SignUpScreen;
