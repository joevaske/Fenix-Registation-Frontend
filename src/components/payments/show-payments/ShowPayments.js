import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import {
  deletePayment,
  getPayments,
  reset,
} from '../../../redux/features/payments/paymentsSlice';
import { fetchUsers } from '../../../redux/features/users/usersSlice';
import { Link } from 'react-router-dom';

import './ShowPayments.css';

import Loading from '../../layout/loading/Loading';
import ShowPaymentsList from './ShowPaymentsList';

const ShowPayments = () => {
  const dispatch = useDispatch();

  const { payments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(getPayments());
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const getPaymentUser = (id) => {
    const user = users.find((user) => user.user_id === Number(id));

    if (!user) {
      return 'No user';
    } else {
      return user.user_fname + ' ' + user.user_lname;
    }
  };
  var currMonthName = moment().format('MMMM');
  var prevMonthName = moment().subtract(1, 'month').format('MMMM');

  const lastMonthPayments = payments.filter(
    (payment) => moment(payment.payment_date).format('MMMM') == currMonthName
  );

  const prevMonthPayments = payments.filter(
    (payment) => moment(payment.payment_date).format('MMMM') == prevMonthName
  );

  const onPaymentDelete = (id) => {
    dispatch(deletePayment(id));
    alert('Do you really want to delete this payment?');
    dispatch(reset());
  };
  return (
    <div className='show-payments'>
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <h2>
            {' '}
            Payments in {currMonthName} {moment().year()}.
          </h2>
          <ShowPaymentsList
            getPaymentUser={getPaymentUser}
            payments={lastMonthPayments}
            month={currMonthName}
            users={users}
            onPaymentDelete={onPaymentDelete}
          />
          <h2>
            Payments in {prevMonthName} {moment().year()}.
          </h2>
          <ShowPaymentsList
            getPaymentUser={getPaymentUser}
            payments={prevMonthPayments}
            month={prevMonthName}
            users={users}
            onPaymentDelete={onPaymentDelete}
          />
          <h2>All Payments</h2>
          <ShowPaymentsList
            getPaymentUser={getPaymentUser}
            payments={payments}
            users={users}
            onPaymentDelete={onPaymentDelete}
          />
        </>
      )}
      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowPayments;
