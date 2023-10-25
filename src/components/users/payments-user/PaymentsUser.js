import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserById,
  fetchUsers,
} from '../../../redux/features/users/usersSlice';

import { getPayments } from '../../../redux/features/payments/paymentsSlice';
import UserPaymentsList from './UserPaymentsList';
const PaymentsUser = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;

  const { payments } = useSelector((state) => state.payments);

  const user = useSelector((state) => selectUserById(state, Number(id)));

  useEffect(() => {
    dispatch(getPayments());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='user-payments'>
      <h2>
        Payments for {user.user_fname} {user.user_lname}
      </h2>

      <UserPaymentsList payments={payments} userId={id} user={user} />
    </div>
  );
};

export default PaymentsUser;
