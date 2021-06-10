import React from 'react';
import {Image, View} from 'react-native';
import SecondaryText from '../../components/text/SecondaryText';
import PrimaryText from '../../components/text/PrimaryText';
import CustomText from '../../components/text/CustomText';
import LinkText from '../../components/text/LinkText';
import {SignupRequestBody} from '../../services/auth';
import {KeyboardAwareView} from '../../components/form/KeyboardAwareView';
import SignupForm from './components/SignUpForm';
import {NetworkStatus} from '../../types/network-status';
import SignupScreenStyle from './SignUpScreen.style';

export type SignUpScreenView = {
  handleFormSubmit: (fields: SignupRequestBody) => void;
  signInStatus: NetworkStatus;
  errorMessage?: string;
};

function SignUpScreenView(props: SignUpScreenView) {
  const {handleFormSubmit, signInStatus, errorMessage} = props;

  return (
    <KeyboardAwareView
      testID="sign-up-screen"
      style={SignupScreenStyle.container}>
      <View style={SignupScreenStyle.heading}>
        <PrimaryText style={SignupScreenStyle.title}>
          Create Account,
        </PrimaryText>
        <SecondaryText style={SignupScreenStyle.subTitle}>
          Sign up to get started
        </SecondaryText>
      </View>
      <Image
        source={require('./img/warmup.png')}
        style={SignupScreenStyle.logo}
      />
      <SignupForm
        onSubmit={handleFormSubmit}
        error={signInStatus === 'error'}
        errorMessage={errorMessage}
      />
      <CustomText style={SignupScreenStyle.termsLinks}>
        <CustomText>By using this app you agree to our </CustomText>
        <LinkText>Terms of Use </LinkText>
        <CustomText>and </CustomText>
        <LinkText>Privacy Policy</LinkText>
      </CustomText>
    </KeyboardAwareView>
  );
}

export default SignUpScreenView;
