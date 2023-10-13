import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../../redux/features/users/usersSlice';
import './CreateUser.css';

const CreateUser = () => {
  const dispatch = useDispatch();
  const date = new Date();
  // Format the date to YYYY-MM-DD
  const formattedDate = date
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .reverse()
    .join('-');

  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    email: '',
    street: '',
    street_nr: '',
    post_nr: '',
    living_place: '',
    pid: '',
    birth_date: '',
    access_date: formattedDate,
    role: 'member',
    status: 'active',
    password: '',
  });

  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewUser(inputs));

    navigate('/users');
  };

  return (
    <div className='create-user'>
      <form>
        {err && <p className='error-message'>{err}</p>}
        <div className='form-row'>
          <label htmlFor='fname'>First Name:</label>
          <input type='text' id='fname' name='fname' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <label htmlFor='lname'>Last Name:</label>
          <input type='text' id='lname' name='lname' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Streer (address):</label>
          <input
            type='text'
            id='street'
            name='street'
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street_nr'>Street Number:</label>
          <input
            type='text'
            id='street_nr'
            name='street_nr'
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='post_nr'>Post Number:</label>
          <input
            type='text'
            id='post_nr'
            name='post_nr'
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='living_place'>Living Place:</label>
          <input
            type='text'
            id='living_place'
            name='living_place'
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='pid'>Personal Id:</label>
          <input type='text' id='pid' name='pid' onChange={handleChange} />
        </div>
        <div className='form-row'>
          <label htmlFor='birth_date'>Birth date:</label>
          <input
            type='date'
            id='birth_date'
            name='birth_date'
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='role'>Role:</label>
          <select id='role' name='role' onChange={handleChange}>
            <option value=''></option>
            <option value='member'>Member</option>
            <option value='trainer'>Trainer</option>
            <option value='competitor'>Competitor</option>
          </select>
        </div>
        <div className='form-row'>
          <label htmlFor='status'>Status:</label>
          <select id='status' name='status' onChange={handleChange}>
            <option value=''></option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            name='password'
            onChange={handleChange}
          />
        </div>

        <div className='form-button'>
          <button
            className='btn btn-action'
            type='button'
            onClick={handleSubmit}
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
