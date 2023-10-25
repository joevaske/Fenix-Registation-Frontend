import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  deleteUser,
  reset,
} from '../../../redux/features/users/usersSlice';
import { Link } from 'react-router-dom';
import './ShowUsers.css';

import Loading from '../../layout/loading/Loading';
import placeholder from '../../../images/placeholder.jpg';
import ShowUsersHeader from './ShowUsersHeader';
import UsersList from './UsersList';

const ShowUsers = () => {
  const dispatch = useDispatch();

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  const [searchResults, setSearchResults] = useState(users);

  /*   const users = useSelector(selectAllUsers); */
  /*   const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError); */

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUsers());
    }
    setSearchResults(users);
  }, [users]);

  const onUserDelete = (id) => {
    /*  axios.delete(`/users/delete-user/${users.user_id}`); */
    dispatch(deleteUser(id));
    alert('Do you really want to delete this user?');
    dispatch(reset());
  };
  return (
    <div className='show-users'>
      {isLoading && <Loading />}

      <ShowUsersHeader users={users} setSearchResults={setSearchResults} />
      {isSuccess && (
        <UsersList searchResults={searchResults} onUserDelete={onUserDelete} />
      )}
      {!searchResults.length && (
        <UsersList searchResults={users} onUserDelete={onUserDelete} />
      )}

      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowUsers;
