import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { getPeymentsUser } from '../../../redux/features/payments/paymentsSlice';
import moment from 'moment';

import './LatestPayments.css';

const LatestPayments = () => {
  const dispatch = useDispatch();
  const { paymentsUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );
  useEffect(() => {
    dispatch(getPeymentsUser());
  }, []);

  return (
    <div className='container latest-payments'>
      <div className='row pb-3'>
        <div className='col-2 '>Id</div>
        <div className='col-2'>Member</div>
        <div className='col-2'>Month</div>
        <div className='col-2'>Type</div>
        <div className='col-2'>Amount</div>
        <div className='col-1'>View </div>
      </div>
      {paymentsUser &&
        paymentsUser.slice(0, 10).map((payment) => (
          <div key={payment.payment_id} className='row mb-1'>
            <div className='col-2 '>
              {moment().year()} - {payment.payment_id}
            </div>
            <div className='col-3'>
              {payment.user_fname} {payment.user_lname}
            </div>
            <div className='col-2'> {payment.month}</div>
            <div className='col-2'>{payment.payment_type}</div>
            <div className='col-2'>
              {' '}
              {payment.payment_amount.toLocaleString()}
            </div>
            <div className='col-1'>
              {' '}
              <Link
                className='btn btn-primary tooltip-custom'
                to={`/update-payment/${payment.payment_id}`}
              >
                <FiEdit />
                <span>Edit </span>
              </Link>{' '}
            </div>
          </div>
        ))}
    </div>
  );
};

export default LatestPayments;
