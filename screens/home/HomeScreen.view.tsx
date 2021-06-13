import React from 'react';
import {View} from 'react-native';
import PrimaryText from '../../components/text/PrimaryText';

export type HomeScreenViewProps = {
  name: string;
};
function HomeScreenView(props: HomeScreenViewProps) {
  return (
    <View>
      <View>
        <PrimaryText>Hi {props.name},</PrimaryText>
      </View>
    </View>
  );
}

export default HomeScreenView;
