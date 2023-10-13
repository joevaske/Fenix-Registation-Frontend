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
  });

  const getPaymentUser = (id) => {
    const user = users.find((user) => user.user_id === Number(id));

    if (!user) {
      return 'No user';
    } else {
      return user.user_fname + ' ' + user.user_lname;
    }
  };

  const onPaymentDelete = (id) => {
    dispatch(deletePayment(id));
    alert('Do you really want to delete this payment?');
    dispatch(reset());
  };
  return (
    <div className='show-payments'>
      {isLoading && <Loading />}
      {isSuccess && (
        <table className='payments users'>
          <thead className='payments-header'>
            <tr>
              <th>Id uplate</th>
              <th>Korisnik</th>
              <th>Uplatu izvrsio</th>
              <th>Tip uplate</th>

              <th>Datum uplate</th>
              <th>Poslednja izmena</th>
              <th>Mesec</th>
              <th>Iznos</th>
            </tr>
          </thead>
          <tbody>
            {payments &&
              payments
                .slice(0)
                .reverse()
                .map((payment) => (
                  <tr className='payments-data' key={payment.payment_id}>
                    <td>{`${moment(payment.payment_date).format('YYYY-MM')}-${
                      payment.payment_id
                    }`}</td>
                    <td>{getPaymentUser(payment.user_id)}</td>
                    <td>{getPaymentUser(payment.staff_id)}</td>
                    <td>{payment.payment_type}</td>

                    <td>
                      {moment(payment.payment_date).format('DD. MMM YYYY')}
                    </td>
                    <td>
                      {moment(payment.last_update).format('DD. MMM YYYY')}
                    </td>
                    <td>{payment.month}</td>
                    <td>{parseFloat(payment.payment_amount).toFixed(2)}</td>
                    <td>
                      <Link
                        className='btn btn-action'
                        to={`/update-payment/${payment.payment_id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      {' '}
                      <button
                        className='btn btn-warning'
                        onClick={() => {
                          onPaymentDelete(payment.payment_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowPayments;
