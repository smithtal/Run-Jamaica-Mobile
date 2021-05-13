import React from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  StyleProp,
  TextStyle,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {primary, error, textSecondary} from '../../constants/colors';

export interface CustomTextInputProps
  extends React.PropsWithChildren<TextInputProps> {
  hasError?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
}

export function CustomTextInput(props: CustomTextInputProps): JSX.Element {
  const {style, errorMessage, inputStyle, hasError, ...otherProps} = props;

  const [focused, setFocused] = React.useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  let borderColor: string;

  if (focused) {
    borderColor = primary;
  } else if (hasError) {
    borderColor = error;
  } else {
    borderColor = textSecondary;
  }

  return (
    <View
      style={{
        marginBottom: 15,
        ...(style as object),
      }}>
      <TextInput
        {...otherProps}
        style={{
          borderColor: borderColor,
          borderWidth: 1,
          height: 30,
          fontSize: 14,
          padding: 0,
          paddingLeft: 15,
          fontFamily: 'Roboto',
          ...(inputStyle as object),
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {hasError && (
        <Text style={{color: error, fontSize: 10}}>{errorMessage}</Text>
      )}
    </View>
  );
}
