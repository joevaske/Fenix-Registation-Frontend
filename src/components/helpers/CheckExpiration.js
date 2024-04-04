import moment from 'moment';

export const checkExpiration = (payment, nextPayment, prevPayment) => {
  if (nextPayment === undefined) {
    if (moment(payment.exp_date) < moment()) {
      return (
        <span className='badge bg-danger'>
          Expired in{' '}
          {Math.round((moment() - moment(payment.exp_date)) / 86400000) - 1}{' '}
          days
        </span>
      );
    }
    if (moment(payment.exp_date) > moment()) {
      return (
        <span className='badge text-bg-warning'>
          Expires in{' '}
          {Math.round((moment(payment.exp_date) - moment()) / 86400000) + 1}{' '}
          days
        </span>
      );
    }
  } else {
    if (moment(nextPayment.payment_date) > moment(payment.exp_date)) {
      return (
        <span className='badge bg-danger'>
          Expired in{' '}
          {Math.round(
            (moment(nextPayment.payment_date) - moment(payment.exp_date)) /
              86400000
          ) + 1}{' '}
          days
        </span>
      );
    } else if (moment(nextPayment.payment_date) < moment(payment.exp_date)) {
      return <span className='badge bg-success'>Ok</span>;
    }

    if (moment(payment.exp_date) > moment()) {
      return (
        <span className='badge bg-warning'>
          Expires in{' '}
          {Math.round((moment(payment.exp_date) - moment()) / 86400000) + 1}{' '}
          days
        </span>
      );
    }
  }

  if (payment.exp_date === '') {
    return <span className=' badge bg-danger '>Invalid Exp date</span>;
  }
};
