import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CustomButton from '../CustomButton';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

describe('CustomButton', () => {
  const onPressMock = jest.fn();

  interface renderComponentOverrides {
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  }
  const renderComponent = (overrides: renderComponentOverrides = {}) => {
    return render(
      <CustomButton onPress={onPressMock} {...overrides}>
        Test
      </CustomButton>,
    );
  };

  it('renders correctly', () => {
    renderComponent();
  });

  it('displays title', () => {
    const {getByText} = renderComponent();

    expect(() => getByText('Test')).not.toThrowError();
  });

  it('triggers the `onPress` callback on press', () => {
    const {getByText} = renderComponent();
    fireEvent.press(getByText('Test'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('prioritizes overrides for button styles', () => {
    const {toJSON} = renderComponent({
      buttonStyle: {backgroundColor: 'tomato'},
    });

    expect(toJSON()?.props.style.backgroundColor).toEqual('tomato');
  });

  it('prioritizes overrides for text styles', () => {
    const {toJSON} = renderComponent({
      textStyle: {color: 'black'},
    });

    const textNode = toJSON()?.children![0] as any;

    expect(textNode.props.style.color).toEqual('black');
  });
});
