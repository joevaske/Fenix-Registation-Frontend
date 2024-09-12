import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './InactiveUsers.css';
import { fetchUsers } from '../../../redux/features/users/usersSlice';
import placeholder from '../../../images/placeholder.jpg';

const LatestUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  const inactiveUsers = users.filter((user) => user.user_status == 'inactive');

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUsers());
    }
    /*  console.log(users); */
  });
  return (
    <div className='inactive-users'>
      <div className='total-users-header'>
        <h6>Inactive Users</h6>
      </div>
      <div className='total-users-body'>
        {inactiveUsers.slice(0, 5).map((user) => (
          <div className='inactive-users-user' key={user.user_id}>
            <div className='inactive-user-header'></div>
            <div className='inactive-user-body'>
              <div className='inactive-user-body-image'>
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
              <div className='inactive-user-body-info'>
                <h3>
                  {user.user_fname} {user.user_lname}
                </h3>
                <div className='inactive-user-body-info-contact'>
                  <p>{user.user_email}</p>
                  <p>{user.user_phone}</p>
                </div>
              </div>
            </div>
            <div className='inactive-user-footer'>
              <div className='inactive-user-footer-left'>
                <div
                  className={`user-rank user-rank-${
                    user.user_rank ? user.user_rank : 'white'
                  }`}
                >
                  <div className='user-rank-1'></div>
                  <div className='user-rank-2'></div>
                  <div className='user-rank-1'></div>
                </div>
                <div className='user-rank-title'>
                  {user.user_rank ? user.user_rank : 'white'}
                </div>
              </div>
              <div className='inactive-user-footer-right'>
                <Link
                  className='btn btn-secondary btn-sm'
                  to={`/user-profile/${user.user_id}`}
                >
                  View profile
                </Link>
              </div>
            </div>
          </div>
          /*  <p>
            {user.user_image} {user.user_fname} {user.user_lname}{' '}
            {user.user_email}
          </p> */
        ))}
      </div>
      <div className='inactive-users-footer'>
        <Link className='btn btn-primary btn-sm' to='/users'>
          Show all users
        </Link>
      </div>
    </div>
  );
};

export default LatestUsers;
