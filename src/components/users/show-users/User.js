import placeholder from '../../../images/placeholder.jpg';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete, FiPlusSquare, FiLayers } from 'react-icons/fi';
import './User.css';

const User = ({ user, onUserDelete }) => {
  return (
    <div className='user'>
      <div className='user-image'>
        <img
          className='users-list-image'
          src={
            user.user_image === ''
              ? placeholder
              : process.env.PUBLIC_URL + '/upload/' + user.user_image
          }
          alt={`${user.user_fname}-${user.user_lname}`}
        />
      </div>
      <div className='user-name'>
        <h3>{`${user.user_fname} ${user.user_lname}`}</h3>
      </div>
      <div className='user-phone'>
        <p>{user.user_phone}</p>
      </div>
      <div className='user-email'>
        <p>{user.user_email}</p>
      </div>
      <div
        className={`user-rank user-rank-${
          user.user_rank ? user.user_rank : 'white'
        }`}
      >
        <div className='user-rank-1'></div>
        <div className='user-rank-2'></div>
        <div className='user-rank-1'></div>
      </div>
      <div className='user-status'>
        <p>{user.user_status}</p>
      </div>
      <div className='user-action'>
        <Link
          className='btn btn-action tooltip'
          to={`/user-profile/${user.user_id}`}
        >
          <FiPlusSquare />
          <span>Show User profile</span>
        </Link>

        <Link
          className='btn btn-action tooltip'
          to={`/user-payments/${user.user_id}`}
        >
          <FiLayers />
          <span>Show User payments</span>
        </Link>

        <Link
          className='btn btn-action tooltip'
          to={`/update-user/${user.user_id}`}
        >
          <FiEdit />
          <span>Edit User</span>
        </Link>

        <button
          className='btn btn-warning tooltip'
          onClick={() => {
            onUserDelete(user.user_id);
          }}
        >
          <FiDelete />
          <span>Delete User</span>
        </button>
      </div>
    </div>
  );
};

export default User;
