import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/features/users/usersSlice';
import authReducer from '../redux/features/auth/authSlice';
import paymentsReducer from './features/payments/paymentsSlice';
import ranksReducer from './features/ranks/ranksSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    payments: paymentsReducer,
    ranks: ranksReducer,
  },
});
