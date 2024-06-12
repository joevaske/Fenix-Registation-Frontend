import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNewPayment } from '../../../redux/features/payments/paymentsSlice';
import {
  fetchUsers,
  selectAllUsers,
} from '../../../redux/features/users/usersSlice';

import moment from 'moment';

import './CreatePayment.css';

const CreatePayment = () => {
  const dispatch = useDispatch();
  const date = new Date();

  const users = useSelector(selectAllUsers);
  const { user } = useSelector((state) => state.auth);
  const { payments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );
  /*   const [expDate, setExpDate] = useState(date); */

  const [inputs, setInputs] = useState({
    user_id: '',
    staff_id: user.user_id,
    payment_type: '',
    payment_amount: null,
    payment_date: date.toString(),
    last_update: date.toString(),
    exp_date: '',
    month: '',
    note: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  /*  const [expDate, setExpDate] = useState(date); */
  /* const expDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ); */

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
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ).toString(),
        }));
      } else if (data.value === '3 - moonth') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            date.getFullYear(),
            date.getMonth() + 3,
            date.getDate()
          ).toString(),
        }));
      } else if (data.value === 'year') {
        setInputs((prev) => ({
          ...prev,
          exp_date: new Date(
            date.getFullYear(),
            date.getMonth() + 12,
            date.getDate()
          ).toString(),
        }));
      }
    } else {
      setInputs((prev) => ({ ...prev, payment_type: '' }));
    }
  };

  /// Ovde izvan petlje treba dodati hendler za exp date

  const handleSelectMonth = (data) => {
    if (data) {
      setInputs((prev) => ({ ...prev, month: data.value }));
    } else {
      setInputs((prev) => ({ ...prev, month: '' }));
    }
    setSelectMonth(data);
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewPayment(inputs));

    navigate('/');
    console.log(inputs);
  };

  return (
    <div className='create-payment'>
      <h2>Create New Payment</h2>
      <form>
        {err && <p className='error-message'>{err}</p>}

        <div className='form-row'>
          <Select
            className='select-user'
            name='selectUser'
            options={rsOptions}
            placeholder='Select user'
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
            placeholder='Select payment type'
            value={paymentType}
            onChange={handleSelectPaymentType}
            isSearchable={true}
            isMulti={false}
          />
        </div>
        <div className='form-row payment-exp'>
          <input
            className='form-control'
            type='text'
            value={moment(inputs.exp_date).format('DD. MM. yyyy. hh:mm')}
            readOnly
          />
        </div>
        <div className='form-row'>
          <Select
            className='select-payment-month'
            name='selectMonth'
            options={months}
            placeholder='Select month'
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
          />
        </div>

        <div className='form-row payment-note mb-5'>
          <textarea
            className='form-control'
            placeholder='Add Note here'
            id='note'
            name='note'
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className='btn btn-primary'
          type='button'
          onClick={handleSubmit}
        >
          Make Payment!
        </button>
      </form>
    </div>
  );
};

export default CreatePayment;
