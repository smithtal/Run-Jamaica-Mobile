import React from 'react';

import CustomText, {CustomTextProps} from './CustomText';
import {primary} from '../../constants/colors';

function LinkText(
  props: React.PropsWithChildren<CustomTextProps>,
): JSX.Element {
  return <CustomText color={primary} {...props} />;
}

export default LinkText;
