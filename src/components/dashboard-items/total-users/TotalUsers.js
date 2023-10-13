import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PiChartLineUpLight } from 'react-icons/pi';
import {
  selectAllUsers,
  getUsersStatus,
  getUsersError,
  fetchUsers,
} from '../../../redux/features/users/usersSlice';
import moment from 'moment';

import './TotalUsers.css';

const TotalUsers = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  const currentMonth = moment().format('MM');
  const currentMonthName = moment().format('MMMM');

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  });

  const lastMonthUsers = users.filter(
    (user) =>
      moment(user.user_access_date).format('MM') === currentMonth && (
        <p>{user.user_access_date}</p>
      )
  );

  return (
    <div className='total-users'>
      <div className='total-users-header'>
        <h6>Total Users</h6>
      </div>
      <div className='total-users-body'>
        <div className='total-users-statistics'>
          <h4>{users.length}</h4>
          <div className='total-users-statistics-comparation'>
            <button className='btn'>
              <PiChartLineUpLight />
              {lastMonthUsers.length}
            </button>
          </div>
        </div>
      </div>
      <div className='total-users-footer'>
        <p className='comparation-explanation'>Users in {currentMonthName}</p>
      </div>

      {console.log(users.length)}
      {console.log(lastMonthUsers.length)}
    </div>
  );
};

export default TotalUsers;
