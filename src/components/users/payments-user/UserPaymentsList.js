import './UserPaymentsList.css';
import moment from 'moment';

const UserPaymentsList = ({ payments, userId, user }) => {
  const userPayments = payments.filter(
    (payment) => payment.user_id === Number(userId)
  );

  const amount = userPayments.reduce((a, v) => (a = a + v.payment_amount), 0);
  return (
    <div className='user-payments-list'>
      {userPayments == '' && (
        <div>
          No Payments for user {user.user_fname} {user.user_lname}
        </div>
      )}
      <div className='user-total-payments'>
        Total Amount: {amount.toFixed(2)}
      </div>
      {userPayments &&
        userPayments.map((filteredPayment) => (
          <div className='user-payment' key={filteredPayment.payment_id}>
            <div className='payment-id'>
              <p> Id:</p>
              {moment().year()} - {filteredPayment.payment_id}
            </div>
            <div className='payment-amount'>
              <p>Amount:</p>
              {filteredPayment.payment_amount.toFixed(2)}
            </div>
            <div className='payment-month'>
              {/*  <p>Month:</p> */}
              {filteredPayment.month}
            </div>

            <div className='payment-date'>
              <p>Date: </p>
              {moment(filteredPayment.payment_date).format(
                'DD. MM. yyyy. hh:mm'
              )}
            </div>
            <div className='payment-type'>
              <p>Type:</p>
              {filteredPayment.payment_type}
            </div>
            <div className='payment-last-update'>
              <p>Last Update:</p>
              {moment(filteredPayment.last_update).format(
                'DD. MM. yyyy. hh:mm'
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserPaymentsList;
