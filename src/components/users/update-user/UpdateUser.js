import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateUser.css';

import axios from 'axios';

const UpdateUser = ({ id }) => {
  const [inputs, setInputs] = useState({
    id: id,
    fname: '',
    lname: '',
    email: '',
    street: '',
    street_nr: '',
    post_nr: '',
    living_place: '',
    birth_date: '',
    access_date: '',
    role: 'member',
    status: 'active',
    password: '',
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const getSingleUser = () => {
    axios
      .get(`http://localhost:3001/users/single-user`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setInputs({
          ...inputs,
          fname: response.data[0].user_fname,
          lname: response.data[0].user_lname,
          email: response.data[0].user_email,
          street: response.data[0].user_street,
          street_nr: response.data[0].user_street_nr,
          post_nr: response.data[0].user_post_nr,
          living_place: response.data[0].user_living_place,
          birth_date: response.data[0].user_birth_date,
          access_date: response.data[0].user_access_date,
          role: response.data[0].user_status,
          status: response.data[0].user_status,
          password: response.data[0].user_password,
        });
      });
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/users/update', inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
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
            type='text'
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
