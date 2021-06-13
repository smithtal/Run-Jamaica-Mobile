import React from 'react';
import ContainerStyle from './Container.style';
import {View} from 'react-native';

function Container(props: React.PropsWithChildren<{}>) {
  return <View style={ContainerStyle.container}>{props.children}</View>;
}

export default Container;
