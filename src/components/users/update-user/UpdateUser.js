import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUser,
  selectUserById,
} from '../../../redux/features/users/usersSlice';

import './UpdateUser.css';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;
  // retrive userId
  const user = useSelector((state) => selectUserById(state, Number(id)));

  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const [inputs, setInputs] = useState({
    id: user.user_id,
    fname: user.user_fname,
    lname: user.user_lname,
    email: user.user_email,
    street: user.user_street,
    street_nr: user.user_street_nr,
    post_nr: user.user_post_nr,
    living_place: user.user_living_place,
    pid: user.user_pid,
    birth_date: user.user_birth_date,
    access_date: user.user_access_date,
    role: user.user_role,
    status: user.user_status,
    password: user.user_password,
  });

  /*   console.log(user);
  console.log(inputs); */
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canSave =
    [inputs.fname, inputs.lname, inputs.email, inputs.password].every(
      Boolean
    ) && addRequestStatus === 'idle';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(
          updateUser({
            id: Number(id),
            fname: inputs.fname,
            lname: inputs.lname,
            email: inputs.email,
            street: inputs.street,
            street_nr: inputs.street_nr,
            post_nr: inputs.post_nr,
            living_place: inputs.living_place,
            pid: inputs.pid,
            birth_date: inputs.birth_date,
            access_date: inputs.access_date,
            role: inputs.role,
            status: inputs.status,
            password: inputs.password,
          })
        ).unwrap();
        setInputs({
          fname: '',
          lname: '',
          email: '',
          street: '',
          street_nr: '',
          post_nr: '',
          living_place: '',
          pid: '',
          birth_date: '',
          access_date: '',
          role: 'member',
          status: 'active',
          password: '',
        });

        navigate('/');
      } catch (err) {
        console.error('Failed to update the user: ', err);
        setError('Failed to update the user: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };
  return (
    <div className='update-user'>
      <form>
        {err && <p className='error-message'>{err}</p>}
        <div className='form-row'>
          <label htmlFor='fname'>First Name:</label>
          <input
            type='text'
            id='fname'
            name='fname'
            value={inputs.fname}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='lname'>Last Name:</label>
          <input
            type='text'
            id='lname'
            name='lname'
            value={inputs.lname}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email'>Email:</label>
          <input
            autocomplete='off'
            type='email'
            id='email'
            name='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Streer (address):</label>
          <input
            type='text'
            id='street'
            name='street'
            value={inputs.street}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street_nr'>Street Number:</label>
          <input
            type='text'
            id='street_nr'
            name='street_nr'
            value={inputs.street_nr}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='post_nr'>Post Number:</label>
          <input
            type='text'
            id='post_nr'
            name='post_nr'
            value={inputs.post_nr}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='living_place'>Living Place:</label>
          <input
            type='text'
            id='living_place'
            name='living_place'
            value={inputs.living_place}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='pid'>Personal Id:</label>
          <input
            type='text'
            id='pid'
            name='pid'
            value={inputs.pid}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='birth_date'>Birth date:</label>
          <input
            type='date'
            id='birth_date'
            name='birth_date'
            value={inputs.birth_date}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='role'>Role:</label>
          <select
            id='role'
            name='role'
            onChange={handleChange}
            value={inputs.role}
          >
            <option value='member'>Member</option>
            <option value='trainer'>Trainer</option>
            <option value='competitor'>Competitor</option>
          </select>
        </div>
        <div className='form-row'>
          <label htmlFor='status'>Status:</label>
          <select
            id='status'
            name='status'
            onChange={handleChange}
            value={inputs.status}
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-button'>
          <button
            className='btn btn-action'
            type='button'
            onClick={handleSubmit}
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
