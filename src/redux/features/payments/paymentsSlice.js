import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import paymentsServce from './paymentsServce';

const initialState = {
  payments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const addNewPayment = createAsyncThunk(
  'payments/addNewPayment',
  async (payment) => {
    try {
      return await paymentsServce.createPayment(payment);
    } catch (err) {
      return err.message;
    }
  }
);

export const getPayments = createAsyncThunk(
  'payments/getPayments',
  async () => {
    try {
      return await paymentsServce.fetchPayments();
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async (payment) => {
    try {
      return await paymentsServce.editPayment(payment);
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (id) => {
    try {
      return await paymentsServce.removePayment(id);
      // if (response.status === 200) return initialUser;
    } catch (err) {
      return err.message;
    }
  }
);

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPayments.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.payments = null;
        state.message = action.payload;
      })
      .addCase(addNewPayment.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addNewPayment.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isSuccess = false;
        const newPayment = action.meta.arg;
        const newValue = { ...newPayment, payment_id: action.payload.insertId };
        state.payments.push(newValue);

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addNewPayment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.payments = null;
      })
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        /*  console.log(current(state.payments)); */
        const index = state.payments.findIndex(
          (payment) => payment.payment_id === action.meta.arg
        );
        state.payments.splice(index, 1);
        state.isLoading = false;
        state.isSuccess = true;

        /* console.log(current(state.payments)); */
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.payments = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        //console.log(action);
        const { payment_id } = action.payload.data.payment;
        //  console.log(payment_id);
        const index = state.payments.findIndex(
          (payment) => payment.payment_id === Number(payment_id)
        );
        state.payments[index] = action.payload.data.payment;
      });
  },
});

export const { reset } = paymentsSlice.actions;

export const selectAllPayments = (state) => state.payments.payments;

export const selectPaymentByID = (state, paymentId) =>
  state.payments.payments.find((payment) => payment.payment_id === paymentId);

export default paymentsSlice.reducer;
