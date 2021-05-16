jest.mock('../../../services/auth');

import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Text} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
import {AuthWrapper} from '../AuthWrapper';
import {refreshCredentials} from '../../../services/auth';

const {getItem, removeItem} = EncryptedStorage;

const getItemMock = getItem as jest.Mock;
const removeItemMock = removeItem as jest.Mock;

const refreshCredentialsMock = refreshCredentials as jest.Mock;

describe('AuthWrapper', () => {
  const renderComponent = () => {
    return render(
      <AuthWrapper
        renderWhenAuthenticated={() => <Text>Authenticated</Text>}
        renderWhenUnauthenticated={() => (
          <Text>Not Authenticated</Text>
        )}></AuthWrapper>,
    );
  };

  beforeEach(() => {
    /* Stop legitimate console.error from appearing in logs. */
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});
  });

  it('renders without error', () => {
    renderComponent();
  });

  it('uses stored refresh token to get new credentials on initial render', async () => {
    getItemMock.mockResolvedValue('refresh-token');

    await waitFor(() => {
      renderComponent();
    });
    expect(getItemMock).toHaveBeenCalled();
    expect(refreshCredentialsMock).toHaveBeenCalledWith('refresh-token');
  });

  it('removes stored refresh token if there is an error fetching new credentials', async () => {
    getItemMock.mockResolvedValue('refresh-token');

    refreshCredentialsMock.mockRejectedValueOnce({
      message: 'error refreshing credentials',
    });

    await waitFor(() => {
      renderComponent();
    });

    expect(removeItemMock).toHaveBeenCalled();
  });
});
