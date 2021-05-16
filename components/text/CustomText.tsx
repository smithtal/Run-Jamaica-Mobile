import React from 'react';
import {StyleProp, Text, TextProps, ViewStyle} from 'react-native';

export interface CustomTextProps extends TextProps {
  color?: string;
}

function CustomText(
  props: React.PropsWithChildren<CustomTextProps>,
): JSX.Element {
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
