import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './screens/splash/SplashScreen';
import SignUpScreen from './screens/sign-up/SignUpScreen';
import SignInScreen from './screens/sign-in/SignInScreen';
import {AuthWrapper} from './components/auth/AuthWrapper';
import HomeScreen from './screens/home/HomeScreen';
import Container from './components/container/Container';

function App(): JSX.Element {
  return (
    <AuthWrapper
      renderWhenAuthenticated={DashboardStack}
      renderWhenUnauthenticated={UnauthenticatedStack}
    />
  );
}

export type DefaultStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const DefaultStack = createStackNavigator<DefaultStackParamList>();
function UnauthenticatedStack() {
  return (
    <NavigationContainer>
      <DefaultStack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <DefaultStack.Screen name="Splash" component={SplashScreen} />
        <DefaultStack.Screen name="SignUp" component={SignUpScreen} />
        <DefaultStack.Screen name="SignIn" component={SignInScreen} />
      </DefaultStack.Navigator>
    </NavigationContainer>
  );
}

export type DashboardStackParamList = {
  Home: undefined;
};

const AuthenticatedStack = createStackNavigator<DashboardStackParamList>();
function DashboardStack() {
  const withContainer = (
    component: () => JSX.Element | null,
  ): (() => JSX.Element) => {
    return (): JSX.Element => <Container>{component()}</Container>;
  };
  return (
    <NavigationContainer>
      <AuthenticatedStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <AuthenticatedStack.Screen
          name="Home"
          component={withContainer(HomeScreen)}
        />
      </AuthenticatedStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
