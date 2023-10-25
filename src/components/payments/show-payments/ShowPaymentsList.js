import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';

import moment from 'moment';
import './ShowPaymentsList.css';

const ShowPaymentsList = ({
  payments,
  getPaymentUser,
  onPaymentDelete,
  month,
}) => {
  const amount = payments.reduce((a, v) => (a = a + v.payment_amount), 0);
  return (
    <div className='payments-list'>
      <div className='payments-list-header'>
        <div className='payments-list-header-number-of-payments'>
          Number of payments: {payments.length}
        </div>
        <div className='payments-list-header-total-payments'>
          Total Amount in {month}: {amount}
        </div>
      </div>
      {payments &&
        /*   payments
          .slice(0)
          .reverse() */
        payments.map((payment) => (
          <div className='payment' key={payment.payment_id}>
            <div className='payment-id'>
              <p> Id:</p>
              {moment().year()} - {payment.payment_id}
            </div>
            <div className='payment-user'>
              <p>User:</p>
              {getPaymentUser(payment.user_id)}
            </div>
            <div className='payment-done-by'>
              <p>Done by:</p>
              {getPaymentUser(payment.staff_id)}
            </div>
            <div className='payment-month'>{payment.month}</div>
            <div className='payment-date'>
              <p>Date: </p>
              {moment(payment.payment_date).format('DD. MM. yyyy. hh:mm')}
            </div>
            <div className='payment-type'>
              <p>Type:</p>
              {payment.payment_type}
            </div>
            <div className='payment-last-update'>
              <p>Last Update:</p>
              {moment(payment.last_update).format('DD. MM. yyyy. hh:mm')}
            </div>
            <div className='payment-amount'>
              <p>Amount:</p>
              {payment.payment_amount}
            </div>
            <div className='payment-action'>
              <Link
                className='btn btn-action tooltip'
                to={`/update-payment/${payment.payment_id}`}
              >
                <FiEdit />
                <span>Edit Payment</span>
              </Link>
              <button
                className='btn btn-warning tooltip'
                onClick={() => {
                  onPaymentDelete(payment.payment_id);
                }}
              >
                <FiDelete />
                <span>Delete Payment</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowPaymentsList;
