import {Formik} from 'formik';
import React from 'react';
import {Image, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {CustomTextInput} from '../../components/form/CustomTextInput';
import {KeyboardAwareView} from '../../components/form/KeyboardAwareView';
import CustomText from '../../components/text/CustomText';
import LinkText from '../../components/text/LinkText';
import PrimaryText from '../../components/text/PrimaryText';
import SecondaryText from '../../components/text/SecondaryText';
import useNetwork from '../../hooks/useNetwork';
import SignInScreenStyles from './SignInScreen.style';
import {AuthResponse, signIn} from '../../services/auth';
import {SignInCredentials} from '../../types/sign-in-credentials';
import {AuthContext} from '../../components/auth/auth.context';
import ErrorMessage from '../../components/message/ErrorMessage';
import * as Yup from 'yup';

function SignInScreen(): JSX.Element {
  return (
    <KeyboardAwareView style={SignInScreenStyles.container}>
      <PrimaryText style={SignInScreenStyles.title}>Welcome back,</PrimaryText>
      <SecondaryText style={SignInScreenStyles.subtitle}>
        Login to continue
      </SecondaryText>
      <Image
        source={require('./img/login.png')}
        style={SignInScreenStyles.image}
      />
      <SignInForm />
      <Text style={SignInScreenStyles.signInLink}>
        <CustomText>Don't have an account?</CustomText>
        <LinkText> Sign up</LinkText>
      </Text>
    </KeyboardAwareView>
  );
}

type SignInFormFields = {
  emailAddress: string;
  password: string;
};

function SignInForm() {
  const [{status, error, data}, triggerSignIn] = useNetwork<
    AuthResponse,
    SignInCredentials
  >(signIn);

  const initialValues: SignInFormFields = {
    emailAddress: '',
    password: '',
  };

  let errorMessage = '';

  const {setAccessToken, setRefreshToken} = React.useContext(AuthContext);

  React.useEffect(() => {
    if (status === 'complete') {
      setAccessToken(data?.accessToken!);
      setRefreshToken(data?.refreshToken!);
    } else if (status === 'error') {
      if (error && error.response && error.response.status === 401) {
        errorMessage = 'Incorrect username or password entered.';
      } else {
        errorMessage =
          'Unable to sign in at this time, please try again later.';
      }
    }
  }, [status]);

  const SignInValidationSchema = Yup.object().shape({
    emailAddress: Yup.string().email().required('Email Address is required.'),
    password: Yup.string().required('Password is required.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={triggerSignIn}
      validationSchema={SignInValidationSchema}>
      {({handleChange, handleBlur, values, errors, touched, submitForm}) => {
        return (
          <View>
            <CustomTextInput
              onChangeText={handleChange('emailAddress')}
              onBlur={handleBlur('emailAddress')}
              value={values.emailAddress}
              keyboardType="email-address"
              placeholder="Email"
              hasError={
                (errors.emailAddress && touched.emailAddress) as boolean
              }
              errorMessage={errors.emailAddress}
            />
            <CustomTextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholder="Password"
              hasError={(errors.password && touched.password) as boolean}
              errorMessage={errors.password}
            />
            <CustomButton
              buttonStyle={SignInScreenStyles.submitButton}
              onPress={submitForm}>
              LOGIN
            </CustomButton>
            {status === 'error' && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </View>
        );
      }}
    </Formik>
  );
}

export default SignInScreen;
