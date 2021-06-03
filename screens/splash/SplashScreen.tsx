import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {StackParamList} from '../../App';

import CustomButton from '../../components/CustomButton';
import LinkText from '../../components/text/LinkText';
import PrimaryText from '../../components/text/SecondaryText';
import SplashScreenStyle from './SplashScreen.style';

type SplashScreenNavigationProp = StackNavigationProp<StackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

function SplashScreen(props: SplashScreenProps): JSX.Element {
  const {navigation} = props;

  const navigateToSignUpPage = () => {
    navigation.navigate('SignUp');
  };

  const navigateToSignInPage = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View testID="splash-screen" style={SplashScreenStyle.container}>
      <Image
        source={require('./img/run-jamaica-logo.png')}
        style={SplashScreenStyle.signupIcon}
      />
      <CustomButton
        onPress={navigateToSignUpPage}
        buttonStyle={SplashScreenStyle.signupButton}>
        SIGN UP
      </CustomButton>
      <View style={SplashScreenStyle.signInTextContainer}>
        <PrimaryText style={SplashScreenStyle.signInText}>
          Already have an account?{' '}
        </PrimaryText>
        <LinkText
          style={SplashScreenStyle.signInText}
          onPress={navigateToSignInPage}
          testID="sign-in-button">
          Sign in
        </LinkText>
      </View>
    </View>
  );
}

export default SplashScreen;
