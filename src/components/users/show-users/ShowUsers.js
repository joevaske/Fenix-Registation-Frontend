import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  deleteUser,
  reset,
} from '../../../redux/features/users/usersSlice';
import { Link } from 'react-router-dom';
import './ShowUsers.css';

import Loading from '../../layout/loading/Loading';

const ShowUsers = () => {
  const dispatch = useDispatch();

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  /*   const users = useSelector(selectAllUsers); */
  /*   const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError); */

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUsers());
    }
    /*  console.log(users); */
  });

  const onUserdelete = (id) => {
    /*  axios.delete(`/users/delete-user/${users.user_id}`); */
    dispatch(deleteUser(id));
    alert('Do you really want to delete this user?');
    dispatch(reset());
  };
  return (
    <div className='show-users'>
      {isLoading && <Loading />}
      {isSuccess && (
        <table className='users'>
          <thead>
            <tr>
              <th className='sticky-col first-col'>Ime</th>
              <th className='sticky-col second-col'>Prezime</th>
              <th>Email</th>
              <th>Ulica</th>
              <th>Broj</th>
              <th>Posta</th>
              <th>Mesto</th>
              <th>Broj LK</th>
              <th>Datum rodjenja</th>
              <th>Datum pristupa</th>
              <th>Uloga</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr className='users-list' key={user.user_id}>
                  <td className='sticky-col first-col'>{user.user_fname}</td>
                  <td className='sticky-col second-col'>{user.user_lname}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_street}</td>
                  <td>{user.user_street_nr}</td>
                  <td>{user.user_post_nr}</td>
                  <td>{user.user_living_place}</td>
                  <td>{user.user_pid}</td>
                  <td>{user.user_birth_date}</td>
                  <td>{user.user_access_date}</td>
                  <td>{user.user_role}</td>
                  <td>{user.user_status}</td>
                  <td>
                    <Link
                      className='btn btn-action'
                      to={`/update-user/${user.user_id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    {' '}
                    <button
                      className='btn btn-warning'
                      onClick={() => {
                        onUserdelete(user.user_id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowUsers;
