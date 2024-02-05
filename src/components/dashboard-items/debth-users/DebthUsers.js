import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';

const DebthUsers = () => {
  const dispatch = useDispatch();
  const { paymentsUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.payments
  );

  const debthUsers = paymentsUser.filter(
    (payment) => moment() > moment(payment.exp_date)
  );

  return (
    <div>
      <h2>Debth Users</h2>
      {/*  {console.log(paymentsUser)} */}
    </div>
  );
};

export default DebthUsers;
