import axios from 'axios';
const API_URL = '/payments/';

// Create payment

const createPayment = async (payment) => {
  const response = await axios.post(API_URL, payment);
  return response.data;
};

// Get payments

const fetchPayments = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get payments

const fetchPaymentsUser = async () => {
  const response = await axios.get(API_URL + `/payment-user/`);

  return response.data;
};

// Update payment

const editPayment = async (payment) => {
  const response = await axios.put(API_URL, payment);

  const sendPayment = {
    payment_id: payment.id,
    user_id: payment.user_id,
    staff_id: payment.staff_id,
    payment_type: payment.payment_type,
    payment_amount: payment.payment_amount,
    payment_date: payment.payment_date,
    last_update: payment.last_update,
    month: payment.month,
  };
  response.data.payment = sendPayment;
  return response;
};

// Delete payments

const removePayment = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);
  return response.data;
};

const paymentsService = {
  fetchPayments,
  createPayment,
  editPayment,
  removePayment,
  fetchPaymentsUser,
};

export default paymentsService;
