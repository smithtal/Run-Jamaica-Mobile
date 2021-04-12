import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import LinkText from '../LinkText';

describe('Link', () => {
  const onPressMock = jest.fn();
  it('renders correctly', () => {
    render(<LinkText onPress={onPressMock}>Test</LinkText>);
  });

  it('triggers the onPress handler on press', () => {
    const {getByText} = render(<LinkText onPress={onPressMock}>Test</LinkText>);
    fireEvent.press(getByText('Test'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
