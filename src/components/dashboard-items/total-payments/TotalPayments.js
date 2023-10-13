import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getPayments,
  reset,
} from '../../../redux/features/payments/paymentsSlice';
import { PiChartLineUpLight } from 'react-icons/pi';
import moment from 'moment';
import './TotalPayments.css';

const TotalPayments = () => {
  const dispatch = useDispatch();
  const { payments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );

  useEffect(() => {
    if (!isSuccess) {
      dispatch(getPayments());
    }
  });

  const currentMonth = moment().format('MM');
  const currentMonthName = moment().format('MMMM');
  const lastMonthPayments = payments.filter(
    (payment) =>
      moment(payment.payment_date).format('MM') === currentMonth && (
        <p>{payments.payment_amount}</p>
      )
  );

  const amount = payments.reduce((a, v) => (a = a + v.payment_amount), 0);

  const lastMonthAmount = lastMonthPayments.reduce(
    (a, v) => (a = a + v.payment_amount),
    0
  );

  return (
    <div className='total-payments'>
      <div className='total-payments-header'>
        <h6>Total Payments</h6>
      </div>
      <div className='total-payments-body'>
        <div className='total-payments-body-part-1'>
          <h4>{payments.length}</h4>
          <h3>={amount.toLocaleString()}</h3>
        </div>
        <div className='total-payments-comparation'>
          <button className='btn'>
            <PiChartLineUpLight />
            <h4>{lastMonthPayments.length}</h4>
          </button>
          <button className='btn'>
            <PiChartLineUpLight />
            <h4>={lastMonthAmount.toLocaleString()}</h4>
          </button>
        </div>
      </div>
      <div className='total-payments-footer'>
        <p className='comparation-explanation'>
          Payments in {currentMonthName}
        </p>
      </div>

      {console.log(payments)}
    </div>
  );
};

export default TotalPayments;
