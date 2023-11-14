import placeholder from '../../../images/placeholder.jpg';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete, FiPlusSquare, FiLayers } from 'react-icons/fi';
import './User.css';

const User = ({ user, onUserDelete }) => {
  return (
    <div className='row bg-light border-bottom py-2 user-item'>
      <div className='col-2 col-md-1 text-center'>
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
      <div className='col-9 col-md-6 col-lg-2 user-name'>
        {' '}
        <h3>{`${user.user_fname} ${user.user_lname}`}</h3>
      </div>
      <div className='col-12 col-md-5 col-lg-2 py-2'>{user.user_phone}</div>
      <div className='col-12 col-md-5 col-lg-3'>{user.user_email}</div>
      <div className=' col-6 col-md-2 col-lg-1 py-2'>
        <div
          className={`user-rank user-rank-${
            user.user_rank ? user.user_rank : 'white'
          }`}
        >
          <div className='user-rank-1'></div>
          <div className='user-rank-2'></div>
          <div className='user-rank-1'></div>
        </div>
      </div>
      <div className='col-6 col-md-3 col-lg-1 text-center py-2'>
        {user.user_status === 'active' ? (
          <span className='badge text-bg-success'>active</span>
        ) : (
          <span className='badge text-bg-danger'>inactive</span>
        )}
      </div>
      <div className='col-12 col-lg-2  p-3'>
        <div className='user-action '>
          <Link
            type='button'
            className='btn btn-info tooltip-custom'
            to={`/user-profile/${user.user_id}`}
          >
            <FiPlusSquare />
            <span>Show User profile</span>
          </Link>

          <Link
            type='button'
            className='btn btn-info tooltip-custom'
            to={`/user-payments/${user.user_id}`}
          >
            <FiLayers />
            <span>Show User payments</span>
          </Link>

          <Link
            type='button'
            className='btn btn-dark tooltip-custom'
            to={`/update-user/${user.user_id}`}
          >
            <FiEdit />
            <span>Edit User</span>
          </Link>

          <button
            type='button'
            className='btn btn-warning tooltip-custom'
            onClick={() => {
              onUserDelete(user.user_id);
            }}
          >
            <FiDelete />
            <span>Delete User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
