import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyFormat } from '../../helpers/CurrencyFormat';

import moment from 'moment';

import Select from 'react-select';
import {
  getPayments,
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
    exp_date: payment.exp_date,
    month: payment.month,
    note: payment.note,
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

      if (data.value === 'month') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            moment(inputs.payment_date).year(),
            moment(inputs.payment_date).month() + 1,
            moment(inputs.payment_date).date()
          ).toString(),
        }));
      } else if (data.value === '3 - moonth') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            moment(inputs.payment_date).year(),
            moment(inputs.payment_date).month() + 3,
            moment(inputs.payment_date).date()
          ).toString(),
        }));
      } else if (data.value === 'year') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            moment(inputs.payment_date).year(),
            moment(inputs.payment_date).month() + 12,
            moment(inputs.payment_date).date()
          ).toString(),
        }));
      }
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

  const handleSelectPaymentDate = (data) => {
    if (data) {
      setInputs((prev) => ({ ...prev, payment_date: data.target.value }));

      if (inputs.payment_type === 'month') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            moment(data.target.value).year(),
            moment(data.target.value).month() + 1,
            moment(data.target.value).date()
          ).toString(),
        }));
      } else if (inputs.payment_type === '3 - moonth') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            moment(data.target.value).year(),
            moment(data.target.value).month() + 3,
            moment(data.target.value).date()
          ).toString(),
        }));
      } else if (inputs.payment_type === 'year') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            moment(data.target.value).year(),
            moment(data.target.value).month() + 12,
            moment(data.target.value).date()
          ).toString(),
        }));
      }
    } else {
      setInputs((prev) => ({ ...prev, payment_date: '' }));
    }
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
    navigate('/');
  };

  return (
    <div className='update-payment'>
      {isLoading && <Loading />}
      <h2>Update Payment</h2>
      {isSuccess && (
        <form>
          {err && <p className='error-message'>{err}</p>}
          <div className='form-row '>
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
          <div className='mb-0 text-info'>
            Payment Date :{' '}
            <span>
              {moment(inputs.payment_date).format('DD. MM. yyyy. hh:mm')}
            </span>
          </div>

          <div className='form-floating payment-date mb-3'>
            <input
              className='form-control'
              type='date'
              id='payment_date'
              name='payment_date'
              onChange={handleSelectPaymentDate}
            />
            <label htmlFor='payment_date'>Change Date:</label>
          </div>
          <div className='form-floating payment-exp mb-3'>
            <input
              id='exp_date'
              name='exp_date'
              className='form-control text-warning '
              type='text'
              value={moment(inputs.exp_date).format('DD. MM. yyyy. hh:mm')}
              readOnly
            />
            <span>
              {moment(inputs.exp_date) - moment() < 0 && (
                <p className='text-danger text-end fw-bold'>Expired</p>
              )}
            </span>
            <label htmlFor='exp_date'>Exp Date:</label>
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
              className='text-end'
              placeholder={CurrencyFormat(payment.payment_amount)}
            />
          </div>
          <div className='form-row payment-note mb-5'>
            <textarea
              className='form-control'
              id='note'
              name='note'
              onChange={handleChange}
              placeholder={payment.note}
            ></textarea>
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
