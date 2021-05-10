import React from 'react';
import {Image, View} from 'react-native';
import SecondaryText from '../../components/text/SecondaryText';
import PrimaryText from '../../components/text/PrimaryText';
import {CustomTextInput} from '../../components/form/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/text/CustomText';
import LinkText from '../../components/text/LinkText';
import {AuthResponse, signup, SignupRequestBody} from '../../services/auth';
import {KeyboardAwareView} from '../../components/form/KeyboardAwareView';
import {AuthContext} from '../../components/auth/auth.context';
import ErrorMessage from '../../components/message/ErrorMessage';
import useNetwork from '../../hooks/useNetwork';

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
        setErrorMessage(`This username is already registered.`);
      } else {
        setErrorMessage(`Unable to sign up, try again later.`);
      }
    }
  }, [signInStatus.status]);

  return (
    <KeyboardAwareView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View style={{width: '80%', marginTop: 40, marginBottom: 30}}>
        <PrimaryText style={{fontSize: 30}}>Create Account,</PrimaryText>
        <SecondaryText style={{fontSize: 18}}>
          Sign up to get started
        </SecondaryText>
      </View>
      <Image
        source={require('./img/warmup.png')}
        style={{
          width: 210,
          height: 210,
          marginBottom: 25,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <SignupForm
        onSubmit={handleFormSubmit}
        error={signInStatus.status === 'error'}
        errorMessage={errorMessage}
      />
      <CustomText style={{width: '55%', textAlign: 'center', marginTop: 20}}>
        <CustomText>By using this app you agree to our </CustomText>
        <LinkText>Terms of Use </LinkText>
        <CustomText>and </CustomText>
        <LinkText>Privacy Policy</LinkText>
      </CustomText>
    </KeyboardAwareView>
  );
}

interface SignupFormProps {
  onSubmit: (fields: SignupRequestBody) => void;
  error?: boolean;
  errorMessage?: string;
}

function SignupForm(props: SignupFormProps): JSX.Element {
  const {onSubmit} = props;

  const [name, setName] = React.useState<string>('');
  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const handleSubmit = (): void => {
    if (password === confirmPassword) {
      onSubmit({name, emailAddress, password});
    } else {
      console.error('Mismatch');
    }
  };

  return (
    <View style={{width: '70%'}}>
      <CustomTextInput onChangeText={setName} placeholder="Name" value={name} />
      <CustomTextInput
        onChangeText={setEmailAddress}
        placeholder="Email"
        keyboardType="email-address"
        value={emailAddress}
      />
      <CustomTextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        value={password}
      />
      <CustomTextInput
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
      />
      {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
      <CustomButton buttonStyle={{marginTop: 35}} onPress={handleSubmit}>
        SIGN UP
      </CustomButton>
    </View>
  );
}
export default SignUpScreen;
