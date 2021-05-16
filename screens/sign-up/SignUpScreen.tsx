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
import {Formik} from 'formik';
import * as Yup from 'yup';

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
  type SignupFormFields = {
    name: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
  };

  const {onSubmit} = props;

  const initialValues: SignupFormFields = {
    name: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
  };

  const SignupFormSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name is too short.')
      .max(160, 'Name is too long.')
      .required('Name is required.'),
    emailAddress: Yup.string()
      .email('Email address is invalid.')
      .required('Email address is required.'),
    password: Yup.string().required('Password is required.'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required.')
      .oneOf([Yup.ref('password'), null], 'Must match password.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignupFormSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => {
        return (
          <View style={{width: '70%'}}>
            <CustomTextInput
              onChangeText={handleChange('name')}
              placeholder="Name"
              value={values.name}
              onBlur={handleBlur('name')}
              hasError={(errors.name && touched.name) as boolean}
              errorMessage={errors.name}
              maxLength={160}
            />
            <CustomTextInput
              onChangeText={handleChange('emailAddress')}
              placeholder="Email"
              keyboardType="email-address"
              value={values.emailAddress}
              onBlur={handleBlur('emailAddress')}
              hasError={
                (errors.emailAddress && touched.emailAddress) as boolean
              }
              errorMessage={errors.emailAddress}
            />
            <CustomTextInput
              onChangeText={handleChange('password')}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onBlur={handleBlur('password')}
              hasError={(errors.password && touched.password) as boolean}
              errorMessage={errors.password}
            />
            <CustomTextInput
              onChangeText={handleChange('confirmPassword')}
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              hasError={
                (touched.confirmPassword && errors.confirmPassword) as boolean
              }
              errorMessage={errors.confirmPassword}
            />
            {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            <CustomButton buttonStyle={{marginTop: 35}} onPress={handleSubmit}>
              SIGN UP
            </CustomButton>
          </View>
        );
      }}
    </Formik>
  );
}
export default SignUpScreen;
