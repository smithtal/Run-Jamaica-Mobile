import React from 'react';
import {Text} from 'react-native';

import {textPrimary} from '../../colors';

import {CustomTextProps} from './CustomText';

function PrimaryText(props: CustomTextProps) {
  return <Text color={textPrimary} {...props} />;
}

export default PrimaryText;
