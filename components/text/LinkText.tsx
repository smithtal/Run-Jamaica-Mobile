import React from 'react';

import CustomText, {CustomTextProps} from './CustomText';
import {primary} from '../../colors';

function LinkText(props: CustomTextProps) {
  return <CustomText color={primary} {...props} />;
}

export default LinkText;
