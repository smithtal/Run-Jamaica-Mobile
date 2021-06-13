import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import HomeScreenView from '../HomeScreen.view';

describe('HomeScreenView', () => {
  const renderComponent = (): RenderAPI => {
    return render(<HomeScreenView name="Test" />);
  };
  it('renders without crashing', () => {
    const {container} = renderComponent();
    expect(container).toBeDefined();
  });

  it('shows a greeting to the user', () => {
    const {getByText} = renderComponent();
    expect(getByText('Hi Test,')).toBeDefined();
  });
});
