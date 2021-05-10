import React from 'react';
import {NetworkStatus} from '../types/network-status';

interface NetworkState<T> {
  status: NetworkStatus;
  data?: T;
  error?: any;
}

type NetworkActionType = 'START' | 'COMPLETE' | 'ERROR';
type NetworkActionPayload<T> = {
  data?: T;
  error?: any;
};

interface NetworkAction<T> {
  type: NetworkActionType;
  payload?: NetworkActionPayload<T>;
}

export default function useNetwork<T, A>(
  callBack: (args: A) => Promise<T>,
): [NetworkState<T>, (args: A) => Promise<void>] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<NetworkState<T>, NetworkAction<T>>
  >(networkReducer, {status: 'idle'});

  const trigger = async (args: A) => {
    dispatch({type: 'START'});
    try {
      const data = await callBack(args);
      dispatch({type: 'COMPLETE', payload: {data}});
    } catch (error) {
      dispatch({type: 'ERROR', payload: {error}});
    }
  };

  return [state, trigger];
}

function networkReducer<T>(
  state: NetworkState<T>,
  action: NetworkAction<T>,
): NetworkState<T> {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        status: 'pending',
        data: undefined,
        error: undefined,
      };
    case 'COMPLETE':
      return {
        ...state,
        status: 'complete',
        data: action.payload?.data,
        error: undefined,
      };
    case 'ERROR':
      return {
        ...state,
        status: 'error',
        data: undefined,
        error: action.payload?.error,
      };
  }
}
