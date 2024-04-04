import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserById,
  fetchUsers,
} from '../../../redux/features/users/usersSlice';
import './ProfileUser.css';
import placeholder from '../../../images/placeholder.jpg';

const ProfileUser = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;
  // retrive userId
  const user = useSelector((state) => selectUserById(state, Number(id)));

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const [inputs, setInputs] = useState({
    id: user.user_id,
    fname: user.user_fname,
    lname: user.user_lname,
    email: user.user_email,
    phone: user.user_phone,
    image: user.user_image,
    street: user.user_street,
    street_nr: user.user_street_nr,
    post_nr: user.user_post_nr,
    living_place: user.user_living_place,
    pid: user.user_pid,
    birth_date: moment(user.user_birth_date).format('DD. MM. yyyy.'),
    access_date: moment(user.user_access_date).format('DD. MM. yyyy.'),
    role: user.user_role,
    rank: user.user_rank,
    status: user.user_status,
    password: user.user_password,
  });

  return (
    <div className='user-profile'>
      <div className='user-profile-header'>
        <div className='header-text'>
          <h1>Hello {inputs.fname}</h1>
          <p>Welcome to your profile page</p>

          <Link
            className='btn btn-secondary'
            to={`/update-user/${user.user_id}`}
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div className='user-profile-body'>
        <div className='user-info'>
          <div className='user-info-header'>User Account</div>
          <div className='user-info-body'>
            <h3 className='info-head'>User Information</h3>
            <p>
              Name:{' '}
              <span>
                {inputs.fname} {inputs.lname}
              </span>
            </p>
            <p>
              Email: <span>{inputs.email}</span>
            </p>
            <h3 className='info-head'>Contact Information</h3>
            <p>
              {inputs.street} {inputs.street_nr}
            </p>
            <p>
              {inputs.post_nr} {inputs.living_place}
            </p>
            <p>Tel: {inputs.phone}</p>
            <h3 className='info-head'>Personal Information</h3>
            <p>
              Birth date: <span>{inputs.birth_date}</span>
            </p>
            <p>
              PID: <span>{inputs.pid}</span>
            </p>
          </div>
        </div>
        <div className='user-image'>
          <img
            src={
              inputs.image === ''
                ? placeholder
                : process.env.PUBLIC_URL + '/upload/' + inputs.image
            }
          />
          <h2>
            {inputs.fname} {inputs.lname}
          </h2>
          <h3 className='info-head'>Club Information</h3>
          <p>
            Access date: <span>{inputs.access_date}</span>{' '}
          </p>
          <p>
            Role: <span>{inputs.role}</span>
          </p>

          <div
            style={{ marginLeft: '20px' }}
            className={`user-rank user-rank-${
              inputs.rank ? inputs.rank : 'white'
            }`}
          >
            <div className='user-rank-1'></div>
            <div className='user-rank-2'></div>
            <div className='user-rank-1'></div>
          </div>
          <p>
            Belt: <span className='user-rank-title'>{inputs.rank}</span>
          </p>
          <p>
            Status: <span>{inputs.status}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
