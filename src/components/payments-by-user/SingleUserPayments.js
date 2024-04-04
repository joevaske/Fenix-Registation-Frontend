import moment from 'moment';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { CurrencyFormat } from '../helpers/CurrencyFormat';
import { checkExpiration } from '../helpers/CheckExpiration';

const SingleUserPayments = ({ userID, payments }) => {
  const singleUserPayments = payments.filter(
    (payment) => payment.user_id === userID
  );

  const singleUserPaymentsSorted = singleUserPayments.sort((a, b) => {
    return moment(a.payment_date).diff(b.payment_date);
  });

  return (
    <div>
      {singleUserPaymentsSorted.length > 0 ? (
        singleUserPaymentsSorted.map((payment, index) => {
          const prevPayment = singleUserPaymentsSorted[index - 1];
          const nextPayment = singleUserPaymentsSorted[index + 1];

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
              <div className='text-danger col-12 col-md-2'>
                {checkExpiration(payment, nextPayment, prevPayment)}
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
        })
      ) : (
        <h6 className='text-danger'>User has no payments yet!</h6>
      )}
    </div>
  );
};

export default SingleUserPayments;
