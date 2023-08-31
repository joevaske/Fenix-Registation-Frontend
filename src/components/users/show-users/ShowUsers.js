import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowUsers.css';
import axios from 'axios';

const ShowUsers = () => {
  const [usersList, setUsersList] = useState([]);

  const getUsers = () => {
    axios
      .get('http://localhost:3001/users')
      .then((response) => setUsersList(response.data));
  };

  useEffect(() => {
    getUsers();
  });

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/delete-user/${id}`);
  };
  return (
    <div className='show-users'>
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
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
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
              <td>{user.user_password}</td>
              <td>
                <Link
                  className='btn btn-action'
                  to={`update-user/${user.user_id}`}
                >
                  Edit
                </Link>
              </td>
              <td>
                {' '}
                <button
                  className='btn btn-warning'
                  onClick={() => {
                    deleteUser(user.user_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;
