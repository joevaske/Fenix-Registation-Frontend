import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { PiBookmarkSimple } from 'react-icons/pi';
import { getPeymentsUser } from '../../../redux/features/payments/paymentsSlice';
import moment from 'moment';
import { CurrencyFormat } from '../../helpers/CurrencyFormat';

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
    <div className=' latest-payments'>
      <div className='latest-payments-header'>
        <h6 className='mb-4'>Latest Payments</h6>
      </div>

      <div className='row pb-3'>
        <div className='col-2 d-none d-sm-block'>Id</div>
        <div className='col-7 col-sm-3 '>Member</div>
        <div className='col-4 d-none d-sm-block'>Exp Date</div>
        <div className='col-3 col-sm-2 text-end'>Amount</div>
        <div className='col-2 col-sm-1'>View </div>
      </div>
      {paymentsUser &&
        paymentsUser.slice(0, 10).map((payment) => (
          <div key={payment.payment_id} className='row mb-1'>
            <div className='col-2 payment-id d-none d-sm-block'>
              {moment().year()} - {payment.payment_id}
            </div>
            <div className='col-7 col-sm-3  payment-user'>
              {payment.user_fname} {payment.user_lname}
              {payment.note && (
                <span>
                  <Link to={`/update-payment/${payment.payment_id}`}>
                    <PiBookmarkSimple />
                  </Link>
                </span>
              )}
            </div>
            <div className='col-4 d-none d-sm-block exp-date'>
              {' '}
              {moment(payment.exp_date).format('DD. MM. yyyy. hh:mm')}
              {moment() > moment(payment.exp_date) && (
                <span className='badge text-bg-danger'>Exp</span>
              )}
            </div>
            <div className='col-3 col-sm-2 text-end'>
              {' '}
              {CurrencyFormat(payment.payment_amount)}
            </div>
            <div className='col-2 col-sm-1'>
              {' '}
              <Link
                className='btn btn-primary btn-sm tooltip-custom'
                to={`/update-payment/${payment.payment_id}`}
              >
                <FiEdit />
                <span>Edit </span>
              </Link>{' '}
            </div>
          </div>
        ))}
      <div className='row'>
        <div className='col text-end'>
          <Link className='btn btn-primary btn-sm ' to='/show-payments'>
            Show all payments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestPayments;
