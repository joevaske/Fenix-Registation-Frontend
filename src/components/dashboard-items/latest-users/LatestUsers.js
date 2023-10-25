import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './LatestUsers.css';
import { fetchUsers } from '../../../redux/features/users/usersSlice';
import placeholder from '../../../images/placeholder.jpg';

const LatestUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUsers());
    }
    /*  console.log(users); */
  });
  return (
    <div className='latest-users'>
      <div className='total-users-header'>
        <h6>Latest Users</h6>
      </div>
      <div className='total-users-body'>
        {users.slice(0, 5).map((user) => (
          <div className='latest-users-user' key={user.user_id}>
            <div className='latest-user-header'></div>
            <div className='latest-user-body'>
              <div className='latest-user-body-image'>
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
              <div className='latest-user-body-info'>
                <h3>
                  {user.user_fname} {user.user_lname}
                </h3>
                <div className='latest-user-body-info-contact'>
                  <p>{user.user_email}</p>
                  <p>{user.user_phone}</p>
                </div>
              </div>
            </div>
            <div className='latest-user-footer'>
              <div className='latest-user-footer-left'>
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
              <div className='latest-user-footer-right'>
                <Link
                  className='btn btn-action btn-sm'
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
      <div className='total-users-footer'>
        <Link className='btn btn-action btn-sm' to='/users'>
          Show all users
        </Link>
      </div>
    </div>
  );
};

export default LatestUsers;
