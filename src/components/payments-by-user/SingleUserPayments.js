import moment from 'moment';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { CurrencyFormat } from '../helpers/CurrencyFormat';

const SingleUserPayments = ({ userID, payments }) => {
  const singleUserPayments = payments.filter(
    (payment) => payment.user_id === userID
  );

  return (
    <div>
      {/*     Single User Payments {userID} {console.log(singleUserPayments)} */}
      {singleUserPayments.length > 0 ? (
        singleUserPayments.map((payment, index) => {
          const prevPayment = singleUserPayments[index - 1];
          const nextPayment = singleUserPayments[index + 1];
          if (nextPayment !== undefined) {
            nextPayment.payment_date > payment.exp_date &&
              console.log('istekla uplata');

            return (
              <div key={payment.payment_id} className='row mb-1'>
                <div className='col-12 col-md-1'>
                  {moment().year()} - {payment.payment_id}
                </div>
                <div className='col-12 col-md-2'>
                  {moment(payment.payment_date).format('DD. MMMM. yyyy. hh:mm')}
                </div>
                <div className='col-12 col-md-1'>{payment.month}</div>
                <div className='col-12 col-md-2'>
                  {moment(payment.exp_date).format('DD. MMMM. yyyy. hh:mm')}
                </div>
                <div className='col-12 col-md-1 '> {payment.payment_type}</div>
                <div className='col-12 col-md-1'>
                  {CurrencyFormat(payment.payment_amount)}
                </div>
                <div className='text-danger col-12 col-md-2 text-center'>
                  <span className='badge text-bg-danger'>
                    expired in{' '}
                    {Math.round(
                      (moment(nextPayment.payment_date) -
                        moment(payment.exp_date)) /
                        86400000
                    ) + 1}{' '}
                    days
                  </span>
                </div>
                <div className='col-12 col-md-1 text-end'>
                  <Link
                    className='btn btn-primary btn-sm tooltip-custom'
                    to={`/update-payment/${payment.payment_id}`}
                  >
                    <FiEdit />
                    <span>Edit </span>
                  </Link>
                </div>
              </div>
            );
          } else {
            return (
              <div key={payment.payment_id} className='row mb-1'>
                <div className='col-12 col-md-1'>
                  {moment().year()} - {payment.payment_id}
                </div>
                <div className='col-12 col-md-2'>
                  {moment(payment.payment_date).format('DD. MMMM. yyyy. hh:mm')}
                </div>
                <div className='col-12 col-md-1'>{payment.month}</div>

                <div className='col-12 col-md-2'>
                  {moment(payment.exp_date).format('DD. MMMM. yyyy. hh:mm')}
                </div>
                <div className='col-12 col-md-1 '> {payment.payment_type}</div>
                <div className='col-12 col-md-1'>
                  {CurrencyFormat(payment.payment_amount)}
                </div>
                <div className='text-danger col-12 col-md-2 text-center'>
                  {moment() > moment(payment.exp_date) && (
                    <span className='badge text-bg-danger'>expired</span>
                  )}
                </div>
                <div className='col-12 col-md-1  text-end'>
                  <Link
                    className='btn btn-primary btn-sm tooltip-custom'
                    to={`/update-payment/${payment.payment_id}`}
                  >
                    <FiEdit />
                    <span>Edit </span>
                  </Link>
                </div>
              </div>
            );
          }
        })
      ) : (
        <h6 className='text-danger'>User has no payments yet!</h6>
      )}
    </div>
  );
};

export default SingleUserPayments;
