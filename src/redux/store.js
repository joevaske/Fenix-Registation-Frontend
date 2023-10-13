import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/features/users/usersSlice';
import authReducer from '../redux/features/auth/authSlice';
import paymentsSlice from './features/payments/paymentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    payments: paymentsSlice,
  },
});
