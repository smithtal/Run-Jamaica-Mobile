import React from 'react';
import {StyleProp, Text, TextProps, ViewStyle} from 'react-native';

export interface CustomTextProps extends TextProps {
  children?: React.ReactNode;
  color?: string;
}

function CustomText(props: CustomTextProps): JSX.Element {
  const {children, color, style: styleOverrides, ...otherProps} = props;

  const style = {
    color,
    fontFamily: 'Roboto',
    ...(styleOverrides as object),
  } as StyleProp<ViewStyle>;

  return (
    <Text style={style} {...otherProps}>
      {children}
    </Text>
  );
}

export default CustomText;
