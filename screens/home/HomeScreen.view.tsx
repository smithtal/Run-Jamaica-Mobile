import React from 'react';
import {View, Image} from 'react-native';
import PrimaryText from '../../components/text/PrimaryText';
import SecondaryText from '../../components/text/SecondaryText';
import HomeScreenStyle from './HomeScreen.style';

export type HomeScreenViewProps = {
  name: string;
};
function HomeScreenView(props: HomeScreenViewProps) {
  return (
    <View>
      <View style={HomeScreenStyle.header}>
        <View>
          <PrimaryText style={HomeScreenStyle.greeting}>
            Hi {props.name},
          </PrimaryText>
          <SecondaryText style={HomeScreenStyle.welcome}>
            Welcome back
          </SecondaryText>
        </View>
        <Image
          source={require('./images/notification.png')}
          style={{height: 24, width: 24}}
        />
      </View>
    </View>
  );
}

export default HomeScreenView;
