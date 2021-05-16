import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './screens/splash/SplashScreen';
import SignUpScreen from './screens/sign-up/SignUpScreen';
import SignInScreen from './screens/sign-in/SignInScreen';
import {Text} from 'react-native';
import {AuthWrapper} from './components/auth/AuthWrapper';

export type StackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function App(): JSX.Element {
  return (
    <AuthWrapper
      renderWhenAuthenticated={DashboardStack}
      renderWhenUnauthenticated={DefaultStack}
    />
  );
}

function DefaultStack() {
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

function DashboardStack() {
  return <Text>This is a test.</Text>;
}

export default App;
