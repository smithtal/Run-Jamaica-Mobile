import React from 'react';
import SplashScreen from '../SplashScreen';

import {render} from '@testing-library/react-native';

describe('Splash Screen', () => {
  it('renders correctly', async () => {
    render(<SplashScreen />);
  });
});
