import React from 'react';

import {textSecondary} from '../../colors';

import CustomText, {CustomTextProps} from './CustomText';

function SecondaryText(props: CustomTextProps): JSX.Element {
  return <CustomText color={textSecondary} {...props} />;
}

export default SecondaryText;
