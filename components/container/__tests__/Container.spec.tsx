import React from 'react';
import {Text} from 'react-native';
import Container from '../Container';
import {render} from '@testing-library/react-native';

describe('Container', () => {
  const renderComponent = () => {
    return render(
      <Container>
        <Text>Test</Text>
      </Container>,
    );
  };
  it('renders without crashing', () => {
    const {container} = renderComponent();
    expect(container).toBeDefined();
  });

  it('renders the child component', () => {
    const {getByText} = renderComponent();
    expect(getByText('Test')).toBeDefined();
  });
});
