import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserById,
  fetchUsers,
  reset,
} from '../../../redux/features/users/usersSlice';

import {
  getPeymentsUser,
  deletePayment,
} from '../../../redux/features/payments/paymentsSlice';

import UserPaymentsList from './UserPaymentsList';

const UserPayments = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;

  const { paymentsUser } = useSelector((state) => state.payments);
  const { users } = useSelector((state) => state.users);

  const user = useSelector((state) => selectUserById(state, Number(id)));

  useEffect(() => {
    dispatch(getPeymentsUser());
    dispatch(fetchUsers());
  }, []);

  const userPayments = paymentsUser.filter(
    (payment) => payment.user_id === Number(id)
  );

  const getPaymentUser = (id) => {
    const user = users.find((user) => user.user_id === Number(id));

    if (!user) {
      return 'No user';
    } else {
      return user.user_fname + ' ' + user.user_lname;
    }
  };
  const onPaymentDelete = (id) => {
    dispatch(deletePayment(id));
    alert('Do you really want to delete this payment?');
    dispatch(reset());
  };

  console.log(userPayments);
  return (
    <div>
      {userPayments.length === 0 ? (
        <div className='row mt-5'>
          <div className='col-12'>
            <h3>
              No payments for {user.user_fname} {user.user_lname}
            </h3>
          </div>
        </div>
      ) : (
        <>
          <div className='row my-5 '>
            <div className='col-12 '>
              <h2>
                Payments for {user.user_fname} {user.user_lname}
              </h2>
            </div>
          </div>
          <UserPaymentsList
            payments={userPayments}
            getPaymentUser={getPaymentUser}
            onPaymentDelete={onPaymentDelete}
          />
        </>
      )}
    </div>
  );
};

export default UserPayments;
