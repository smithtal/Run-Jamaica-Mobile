import React from 'react';
import {Image, Text} from 'react-native';
import {KeyboardAwareView} from '../../components/form/KeyboardAwareView';
import CustomText from '../../components/text/CustomText';
import LinkText from '../../components/text/LinkText';
import PrimaryText from '../../components/text/PrimaryText';
import SecondaryText from '../../components/text/SecondaryText';
import SignInScreenStyles from './SignInScreen.style';
import SignInForm from './components/SignInForm';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';

type SignInScreenNavigationProp = StackNavigationProp<StackParamList, 'SignUp'>;

export interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

function SignInScreen(props: SignInScreenProps): JSX.Element {
  const {navigation} = props;

  const navigateToSignUpPage = () => {
    navigation.navigate('SignUp');
  };

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
        <CustomText>Don't have an account?&nbsp;</CustomText>
        <LinkText onPress={navigateToSignUpPage}>Sign up</LinkText>
      </Text>
    </KeyboardAwareView>
  );
}

export default SignInScreen;
