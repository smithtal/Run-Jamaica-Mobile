import React from 'react';
import {render} from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
  });
  it('renders the Splash Screen by default', () => {
    const {getByTestId} = render(<App />);
    expect(() => getByTestId('splash-screen')).not.toThrowError();
  });
});
