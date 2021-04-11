import React from 'react';
import {Image, View, PixelRatio} from 'react-native';

function SplashScreen() {
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
    </View>
  );
}

export default SplashScreen;
