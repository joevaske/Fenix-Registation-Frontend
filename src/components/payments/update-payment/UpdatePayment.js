import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Select from 'react-select';
import {
  deletePayment,
  getPayments,
  reset,
  selectPaymentByID,
  updatePayment,
} from '../../../redux/features/payments/paymentsSlice';
import {
  fetchUsers,
  selectAllUsers,
} from '../../../redux/features/users/usersSlice';

import './UpdatePayment.css';

import Loading from '../../layout/loading/Loading';

const UpdatePayment = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;

  console.log(id);

  const payment = useSelector((state) => selectPaymentByID(state, Number(id)));

  const { payments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );

  const users = useSelector(selectAllUsers);
  const { user } = useSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    id: Number(id),
    user_id: payment.user_id,
    staff_id: payment.staff_id,
    payment_type: payment.payment_type,
    payment_amount: payment.payment_amount,
    payment_date: payment.payment_date,
    last_update: payment.last_update,
    month: payment.month,
  });

  const paymentTypes = [
    { value: 'month', label: 'month' },
    { value: '3 - moonth', label: '3 - moonth' },
    { value: 'year', label: 'year' },
  ];
  const months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February ' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'Jun' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];

  const [paymentType, setPaymentType] = useState();

  // Preparing values for select
  const rsOptions = users.map((x) => ({
    value: x.user_id,
    label: `${x.user_fname} ${x.user_lname}`,
  }));

  const [selectUser, setSelectUser] = useState();
  const [selectMonth, setSelectMonth] = useState();
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  console.log(inputs);

  const getPaymentUser = (id) => {
    let userPay = users.filter((user) => {
      return user.user_id === id;
    });

    return userPay[0].user_fname + ' ' + userPay[0].user_lname;
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (data) => {
    setSelectUser(data);
    if (data) {
      setInputs((prev) => ({ ...prev, user_id: data.value }));
    } else {
      setInputs((prev) => ({ ...prev, user_id: '' }));
    }
  };

  const handleSelectPaymentType = (data) => {
    if (data) {
      setInputs((prev) => ({ ...prev, payment_type: data.value }));
    } else {
      setInputs((prev) => ({ ...prev, payment_type: '' }));
    }
  };
  const handleSelectMonth = (data) => {
    if (data) {
      setInputs((prev) => ({ ...prev, month: data.value }));
    } else {
      setInputs((prev) => ({ ...prev, month: '' }));
    }
    setSelectMonth(data);
    // console.log(data);
  };

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUsers());
      dispatch(getPayments());
    }
  });

  const onPaymentUpdate = (e) => {
    e.preventDefault();

    dispatch(updatePayment(inputs));
    navigate('/show-payments');
  };

  return (
    <div className='update-payment'>
      {isLoading && <Loading />}
      <h2>Update Payment</h2>
      {isSuccess && (
        <form>
          {err && <p className='error-message'>{err}</p>}
          <div className='form-row'>
            <Select
              className='select-user'
              name='selectUser'
              options={rsOptions}
              placeholder={getPaymentUser(payment.user_id)}
              value={selectUser}
              onChange={handleSelect}
              isSearchable={true}
              isMulti={false}
            />
          </div>
          <div className='form-row'>
            <Select
              className='select-payment-type'
              name='selectPaymentType'
              options={paymentTypes}
              placeholder={payment.payment_type}
              value={paymentType}
              onChange={handleSelectPaymentType}
              isSearchable={true}
              isMulti={false}
            />
          </div>
          <div className='form-row'>
            <Select
              className='select-payment-month'
              name='selectMonth'
              options={months}
              placeholder={payment.month}
              value={selectMonth}
              onChange={handleSelectMonth}
              isSearchable={true}
              isMulti={false}
            />
          </div>

          <div className='form-row select-payment-amount'>
            <label htmlFor='payment_amount'>Amount:</label>
            <input
              type='number'
              step='0.01'
              id='payment_amount'
              name='payment_amount'
              onChange={handleChange}
              placeholder={payment.payment_amount.toFixed(2)}
            />
          </div>
          <button className='btn btn-primary' onClick={onPaymentUpdate}>
            Update Payment!
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePayment;
