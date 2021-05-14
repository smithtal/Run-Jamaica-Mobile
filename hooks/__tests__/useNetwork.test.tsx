import React from 'react';
import {NetworkStatus} from '../../types/network-status';
import useNetwork from '../useNetwork';
import {render, waitFor} from '@testing-library/react-native';

describe('useNetwork', () => {
  let status: NetworkStatus;
  let error: any;
  let data: string | undefined;
  let trigger: (args: void) => Promise<void>;

  const TestComponent = ({
    networkCallBack,
    callTrigger = false,
  }: {
    networkCallBack: (args: void) => Promise<string>;
    callTrigger?: boolean;
  }) => {
    const [
      {status: currentStatus, error: currentError, data: currentData},
      currentTrigger,
    ] = useNetwork<string, void>(networkCallBack);

    status = currentStatus;
    error = currentError;
    data = currentData;
    trigger = currentTrigger;

    React.useEffect(() => {
      if (callTrigger) {
        trigger();
      }

      status = currentStatus;
      error = currentError;
      data = currentData;
    }, [currentStatus, currentError, currentData]);

    return null;
  };

  it('network calls have a default state of idle', () => {
    const networkCallBack = (args: void): Promise<string> =>
      Promise.resolve('sample');

    render(<TestComponent networkCallBack={networkCallBack} />);

    expect(status).toBe('idle');
  });

  it('changes the status to pending when triggered', () => {
    const neverResolvingCallback = () => {
      return new Promise(() => {}) as Promise<any>;
    };

    render(
      <TestComponent callTrigger networkCallBack={neverResolvingCallback} />,
    );

    expect(status).toEqual('pending');
  });

  it('changes the status to complete when callback completes', async () => {
    const resolvedWithDataCallBack = (): Promise<string> => {
      return new Promise(resolve => {
        resolve('DATA');
        expect(status).toEqual('complete');
        expect(data).toEqual('DATA');
      });
    };

    await waitFor(() => (
      <TestComponent callTrigger networkCallBack={resolvedWithDataCallBack} />
    ));
  });
});
