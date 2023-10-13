import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewPayment,
  getPayments,
} from '../../../redux/features/payments/paymentsSlice';
import {
  fetchUsers,
  selectAllUsers,
} from '../../../redux/features/users/usersSlice';

const CreatePayment = () => {
  const dispatch = useDispatch();
  const date = new Date();

  const users = useSelector(selectAllUsers);
  const { user } = useSelector((state) => state.auth);
  const { payments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );
  const [inputs, setInputs] = useState({
    user_id: '',
    staff_id: user.user_id,
    payment_type: '',
    payment_amount: null,
    payment_date: date.toString(),
    last_update: date.toString(),
    month: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewPayment(inputs));

    navigate('/show-payments');
  };

  return (
    <div className='create-payment'>
      <form>
        {err && <p className='error-message'>{err}</p>}
        <div className='fomr-row'>
          <Select
            name='selectUser'
            options={rsOptions}
            placeholder='Select user'
            value={selectUser}
            onChange={handleSelect}
            isSearchable={true}
            isMulti={false}
          />
        </div>
        <div className='fomr-row'>
          <Select
            name='selectPaymentType'
            options={paymentTypes}
            placeholder='Select payment type'
            value={paymentType}
            onChange={handleSelectPaymentType}
            isSearchable={true}
            isMulti={false}
          />
        </div>
        <div className='fomr-row'>
          <Select
            name='selectMonth'
            options={months}
            placeholder='Select month'
            value={selectMonth}
            onChange={handleSelectMonth}
            isSearchable={true}
            isMulti={false}
          />
        </div>

        <div className='form-row'>
          <label htmlFor='payment_amount'>Amount:</label>
          <input
            type='number'
            step='0.01'
            id='payment_amount'
            name='payment_amount'
            onChange={handleChange}
          />
        </div>
        <button className='btn' onClick={handleSubmit}>
          Make Payment!
        </button>
      </form>
    </div>
  );
};

export default CreatePayment;
