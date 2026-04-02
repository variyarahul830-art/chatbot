'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from '@/app/store';
import { loadFromStorage } from '@/app/store/authSlice';

function InitializeRedux({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app startup
    dispatch(loadFromStorage());
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <InitializeRedux>{children}</InitializeRedux>
    </Provider>
  );
}
