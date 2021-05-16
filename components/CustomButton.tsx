import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';

import {primary, white} from '../constants/colors';
import CustomText from './text/CustomText';

interface CustomButtonProps extends TouchableWithoutFeedbackProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function CustomButton(
  props: React.PropsWithChildren<CustomButtonProps>,
): JSX.Element {
  const {children, buttonStyle, textStyle, ...otherProps} = props;

  const customButtonStyle = {
    backgroundColor: primary,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 16,
    ...(buttonStyle as object),
  } as StyleProp<ViewStyle>;

  const customTextStyle = {
    textAlign: 'center',
    fontSize: 20,
    ...(textStyle as object),
  } as StyleProp<TextStyle>;

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={customButtonStyle}
      {...otherProps}>
      <CustomText color={white} style={customTextStyle}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
}

export default CustomButton;
