import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './screens/splash/SplashScreen';
import SignUpScreen from './screens/sign-up/SignUpScreen';
import SignInScreen from './screens/sign-in/SignInScreen';
import {AuthContext, AuthContextValue} from './contexts/auth.context';
import {Text} from 'react-native';

export type StackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function App(): JSX.Element {
  const [accessToken, setAccessToken] = React.useState<string | undefined>();
  const [refreshToken, setRefreshToken] = React.useState<string | undefined>();

  return (
    <AuthContext.Provider
      value={{accessToken, refreshToken, setAccessToken, setRefreshToken}}>
      {accessToken ? (
        <Text>Auth Successful</Text>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}

export default App;
