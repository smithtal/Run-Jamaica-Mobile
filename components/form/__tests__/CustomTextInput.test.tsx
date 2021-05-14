import React from 'react';
import {render, fireEvent, RenderAPI} from '@testing-library/react-native';

import {CustomTextInput, CustomTextInputProps} from '../CustomTextInput';
import {primary} from '../../../constants/colors';

describe('CustomTextInput', () => {
  let wrapper: RenderAPI;
  let onChangeTextMock: jest.Mock<any, any>;
  let onFocusMock: jest.Mock<any, any>;
  let onBlurMock: jest.Mock<any, any>;

  const renderComponent = (options: CustomTextInputProps = {}): RenderAPI => {
    return render(
      <CustomTextInput
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        placeholder="Test"
        onChangeText={onChangeTextMock}
        {...options}
      />,
    );
  };

  beforeEach(() => {
    onChangeTextMock = jest.fn();
    onFocusMock = jest.fn();
    onBlurMock = jest.fn();

    wrapper = renderComponent();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });
  it('allows for input', () => {
    const {getByPlaceholderText} = wrapper;

    fireEvent(getByPlaceholderText('Test'), 'onChangeText', 'test');

    expect(onChangeTextMock).toHaveBeenCalledWith('test');
  });

  it('has a green border when focused', () => {
    const {getByPlaceholderText} = wrapper;

    const inputInstance = getByPlaceholderText('Test');

    fireEvent(inputInstance, 'onFocus');

    expect(inputInstance.props.style.borderColor).toEqual(primary);

    fireEvent(inputInstance, 'onBlur');

    expect(inputInstance.props.style.borderColor).not.toEqual(primary);
  });

  it('fires onFocus and onBlur events', () => {
    const {getByPlaceholderText} = wrapper;
    const inputInstance = getByPlaceholderText('Test');

    fireEvent(inputInstance, 'onFocus');
    fireEvent(inputInstance, 'onBlur');

    expect(onFocusMock).toHaveBeenCalled();
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('shows an error message if theres an error', () => {
    const {getByText} = renderComponent({
      hasError: true,
      errorMessage: 'Test Error Message',
    });

    expect(getByText('Test Error Message')).toBeDefined();
  });
});
