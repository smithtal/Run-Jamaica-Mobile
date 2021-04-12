import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './screens/splash/SplashScreen';
import SignUpScreen from './screens/sign-up/SignUpScreen';
import SignInScreen from './screens/sign-in/SignInScreen';

export type StackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
