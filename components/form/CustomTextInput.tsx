import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {textSecondary} from '../../colors';

export function CustomTextInput(
  props: React.PropsWithChildren<TextInputProps>,
): JSX.Element {
  const {style, ...otherProps} = props;

  return (
    <TextInput
      {...otherProps}
      style={{
        borderColor: textSecondary,
        borderWidth: 1,
        height: 30,
        fontSize: 14,
        padding: 0,
        paddingLeft: 15,
        marginBottom: 15,
        fontFamily: 'Roboto',
        ...(style as object),
      }}
    />
  );
}
