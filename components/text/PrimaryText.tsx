import React from 'react';

import {textPrimary} from '../../colors';

import CustomText, {CustomTextProps} from './CustomText';

function PrimaryText(
  props: React.PropsWithChildren<CustomTextProps>,
): JSX.Element {
  return <CustomText color={textPrimary} {...props} />;
}

export default PrimaryText;
