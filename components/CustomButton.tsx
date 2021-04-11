import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';

import {primary, white} from '../colors';

interface CustomButtonProps extends TouchableWithoutFeedbackProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

function CustomButton(props: CustomButtonProps) {
  const {children, buttonStyle, textStyle, ...otherProps} = props;

  const customButtonStyle = {
    backgroundColor: primary,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 16,
    ...(buttonStyle as object),
  } as StyleProp<ViewStyle>;

  const customTextStyle = {
    color: white,
    textAlign: 'center',
    fontSize: 20,
    ...(textStyle as object),
  } as StyleProp<TextStyle>;

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={customButtonStyle}
      {...otherProps}>
      <Text style={customTextStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
