import {Formik} from 'formik';
import React from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {CustomTextInput} from '../../components/form/CustomTextInput';
import {KeyboardAwareView} from '../../components/form/KeyboardAwareView';
import CustomText from '../../components/text/CustomText';
import LinkText from '../../components/text/LinkText';
import PrimaryText from '../../components/text/PrimaryText';
import SecondaryText from '../../components/text/SecondaryText';
import SignInScreenStyles from './SignInScreen.style';

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
  const initialValues: SignInFormFields = {
    emailAddress: '',
    password: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={console.log}>
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
          </View>
        );
      }}
    </Formik>
  );
}

export default SignInScreen;
