import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';
import moment from 'moment';

const UserPaymentsList = ({ payments, getPaymentUser, onPaymentDelete }) => {
  const [data, setData] = useState(payments);
  const [order, setOrder] = useState('ASC');

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder('ASC');
    }
  };

  const sortingDate = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) =>
        moment(a[col]) > moment(b[col]) ? 1 : -1
      );
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) =>
        moment(a[col]) < moment(b[col]) ? 1 : -1
      );
      setData(sorted);
      setOrder('ASC');
    }
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div
          className='col-12 col-md-1 bg-info p-2 text-start'
          onClick={() => sorting('payment_id')}
        >
          Id:{' '}
        </div>

        <div
          className='col-12 col-md-2 bg-info p-2 text-start'
          onClick={() => sorting('staff_id')}
        >
          Done by:
        </div>
        <div
          className='col-12 col-md-1 bg-info p-2 text-left'
          onClick={() => sorting('month')}
        >
          Month:
        </div>
        <div
          className='col-12 col-md-2 bg-info p-2 text-start'
          onClick={() => sortingDate('payment_date')}
        >
          Date:
        </div>
        <div
          className='col-12 col-md-1 bg-info p-2 text-center'
          onClick={() => sorting('payment_type')}
        >
          Type:
        </div>
        <div
          className='col-12 col-md-2 bg-info p-2 text-start'
          onClick={() => sortingDate('last_update')}
        >
          Last Update:
        </div>
        <div
          className='col-12 col-md-1 bg-info p-2 text-center'
          onClick={() => sorting('payment_amount')}
        >
          Amount:
        </div>
        <div className='col-12 col-md-2 bg-info p-2 text-center'>Action:</div>
      </div>
      {data &&
        data
          /*  .slice()
      .reverse() */
          .map((payment) => (
            <div className='row payment' key={payment.payment_id}>
              <div className='col-12 col-md-1  p-2 text-start payment-id'>
                {' '}
                {moment().year()} - {payment.payment_id}
              </div>

              <div className='col-12 col-md-2  p-2 text-start payment-done-by'>
                {' '}
                {getPaymentUser(payment.staff_id)}
              </div>
              <div className='col-12 col-md-1  p-2 text-center payment-month'>
                {payment.month}
              </div>
              <div className='col-12 col-md-2  p-2 text-start payment-date'>
                {' '}
                {moment(payment.payment_date).format('DD. MM. yyyy. hh:mm')}
              </div>
              <div className='col-12 col-md-1  p-2 text-center payment-type'>
                {' '}
                {payment.payment_type}
              </div>
              <div className='col-12 col-md-2  p-2 text-start payment-last-update'>
                {moment(payment.last_update).format('DD. MM. yyyy. hh:mm')}
              </div>
              <div className='col-12 col-md-1 px-3 text-center payment-amount'>
                {payment.payment_amount.toLocaleString()}
              </div>
              <div className='col-12 col-md-2  p-2 text-center payment-action'>
                <Link
                  className='btn btn-primary tooltip-custom'
                  to={`/update-payment/${payment.payment_id}`}
                >
                  <FiEdit />
                  <span>Edit </span>
                </Link>
                <button
                  className='btn btn-danger tooltip-custom'
                  onClick={() => {
                    onPaymentDelete(payment.payment_id);
                  }}
                >
                  <FiDelete />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default UserPaymentsList;
