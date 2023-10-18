import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  updateUser,
  selectUserById,
  fetchUsers,
} from '../../../redux/features/users/usersSlice';

import './UpdateUser.css';

import placeholder from '../../../images/placeholder.jpg';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;
  // retrive userId
  const user = useSelector((state) => selectUserById(state, Number(id)));

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
    birth_date: user.user_birth_date,
    access_date: user.user_access_date,
    role: user.user_role,
    rank: user.user_rank,
    status: user.user_status,
    password: user.user_password,
  });

  /*   console.log(user);
  console.log(inputs); */
  const [err, setError] = useState(null);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData, config);
      setInputs((prev) => ({ ...prev, image: res.data }));
      console.log(inputs);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();
    console.log(' Image Update');
    upload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.image === '') {
      if (
        window.confirm('User image is not uploaded. Do you want to proceed?')
      ) {
        dispatch(updateUser(inputs));
        navigate('/users');
      }
    } else {
      dispatch(updateUser(inputs));
      navigate('/users');
    }
  };

  return (
    <div className='update-user'>
      <form encType='multipart/form-data'>
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
          <label htmlFor='phone'>Phone:</label>
          <input
            autocomplete='off'
            type='tel'
            id='phone'
            name='phone'
            value={inputs.phone}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <img
            className='user-image'
            src={
              inputs.user_image === ''
                ? placeholder
                : `../../../upload/${inputs.image}`
            }
          />
          <label htmlFor='file'>Upload Image:</label>
          <input
            filename={file}
            /* style={{ display: 'none' }} */
            type='file'
            id='file'
            name='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className='btn' onClick={handleUpdateImage}>
            Update Image
          </button>
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
          <label htmlFor='rank'>Rank(belt):</label>
          <select
            id='rank'
            name='rank'
            onChange={handleChange}
            value={inputs.rank}
          >
            <option value=''></option>
            <option value='white'>White</option>
            <option value='gray-white'>Gray-White</option>
            <option value='gray'>Gray</option>
            <option value='gray-black'>Gray-Black</option>
            <option value='yellow-white'>Yellow-White</option>
            <option value='yellow'>Yellow</option>
            <option value='yellow-black'>Yellow-Black</option>
            <option value='orange-white'>Orange-White</option>
            <option value='orange'>Orange</option>
            <option value='orange-black'>Orange-Black</option>
            <option value='green-white'>Green-White</option>
            <option value='green'>Green</option>
            <option value='green-black'>Green-Black</option>
            <option value='blue'>Blue</option>
            <option value='purple'>Purple</option>
            <option value='brown'>Brown</option>
            <option value='black'>Black</option>
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
