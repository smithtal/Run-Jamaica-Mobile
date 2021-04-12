import React from 'react';
import {render} from '@testing-library/react-native';

import CustomText from '../CustomText';

describe('CustomText', () => {
  it('renders correctly', () => {
    render(<CustomText>Test</CustomText>);
  });

  it('displays the desired text', () => {
    const {getByText} = render(<CustomText>Test</CustomText>);

    expect(() => getByText('Test')).not.toThrowError();
  });

  it('uses the provided color', () => {
    const {toJSON} = render(<CustomText color="tomato">Test</CustomText>);

    expect(toJSON()?.props.style.color).toEqual('tomato');
  });

  it('allows for style overrides', () => {
    const {toJSON} = render(
      <CustomText style={{lineHeight: 20}}>Test</CustomText>,
    );

    expect(toJSON()?.props.style.lineHeight).toEqual(20);
  });
});
