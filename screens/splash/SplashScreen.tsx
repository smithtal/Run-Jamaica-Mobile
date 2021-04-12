import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {StackParamList} from '../../App';

import CustomButton from '../../components/CustomButton';
import LinkText from '../../components/text/LinkText';
import PrimaryText from '../../components/text/PrimaryText';

type SplashScreenNavigationProp = StackNavigationProp<StackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

function SplashScreen(props: SplashScreenProps) {
  const {navigation} = props;

  const navigateToSignUpPage = () => {
    navigation.navigate('SignUp');
  };

  const navigateToSignInPage = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View
      testID="splash-screen"
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop: 165,
      }}>
      <Image
        source={require('./img/run-jamaica-logo.png')}
        style={{
          width: 350,
          height: 200,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <CustomButton
        onPress={navigateToSignUpPage}
        buttonStyle={{width: 300, alignSelf: 'center', marginTop: 155}}>
        SIGN UP
      </CustomButton>
      <Text style={{textAlign: 'center', marginTop: 20}}>
        <PrimaryText style={{fontSize: 14}}>
          Already have an account?{' '}
        </PrimaryText>
        <LinkText style={{fontSize: 14}} onPress={navigateToSignInPage}>
          Sign in
        </LinkText>
      </Text>
    </View>
  );
}

export default SplashScreen;
