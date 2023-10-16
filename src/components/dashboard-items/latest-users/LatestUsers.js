import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './LatestUsers.css';
import { fetchUsers } from '../../../redux/features/users/usersSlice';

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
          <p>
            {user.user_fname} {user.user_lname} {user.user_email}
          </p>
        ))}
      </div>
      <div className='total-users-footer'>
        <Link to='/users'>Show all users</Link>
      </div>
    </div>
  );
};

export default LatestUsers;
