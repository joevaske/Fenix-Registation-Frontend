import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPeymentsUser } from '../../redux/features/payments/paymentsSlice';
import { fetchUsers } from '../../redux/features/users/usersSlice';
import SingleUserPayments from './SingleUserPayments';
import SearchBar from '../search-bar/SearchBar';

import placeholder from '../../images/placeholder.jpg';

import './PaymentsByUser.css';

const PaymentsByUser = () => {
  const dispatch = useDispatch();
  const { paymentsUser } = useSelector((state) => state.payments);

  const { users } = useSelector((state) => state.users);

  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    dispatch(getPeymentsUser());
    dispatch(fetchUsers());
  }, []);

  /*  const filterPaymentsByUser = (user_id, payments) => {
    return payments.filter((payment) => payment.user_id == user_id);
  }; */
  return (
    <div className='payments-by-user'>
      <div className='row'>
        <div className='col-12 col-md-4 mb-3'>
          <h2>Payments by User</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6 my-5'>
          <SearchBar data={users} setSearchResults={setSearchResults} />
        </div>
      </div>

      {users &&
        searchResults.map((user) => (
          <div className='single-user-payments-wrap'>
            <div className=' single-user-payments-header '>
              <div className='single-user-payments-header__image'>
                <img
                  className='users-list-image'
                  src={
                    user.user_image === ''
                      ? placeholder
                      : `../../../upload/${user.user_image}`
                  }
                  alt={`${user.user_fname}-${user.user_lname}`}
                />
              </div>
              <div className='single-user-payments-header__name'>
                <h4>
                  {user.user_id} {user.user_fname} {user.user_lname}
                </h4>
              </div>
              <div className='single-user-payments-header__link'>
                <Link
                  className='btn btn-secondary btn-sm'
                  to={`/user-profile/${user.user_id}`}
                >
                  View profile
                </Link>
              </div>
            </div>

            <div className='single-user-payments'>
              <SingleUserPayments
                userID={user.user_id}
                payments={paymentsUser}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PaymentsByUser;
