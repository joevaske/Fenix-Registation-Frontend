import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  updateUser,
  selectUserById,
} from '../../../redux/features/users/usersSlice';

import './UpdateUser.css';

import placeholder from '../../../images/placeholder.jpg';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const belts = useSelector((state) => state.ranks);
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

    if (file) {
      if (file.size >= 10240) {
        alert('File too Big, please select a file less than 5mb');
      } else if (file < 2048) {
        alert('File too small, please select a file greater than 2mb');
      } else {
        upload();
        console.log('Image Updated');
      }
    }
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
    <div className='update-user container'>
      {err && <p className='error-message'>{err}</p>}
      <form encType='multipart/form-data'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='fname'
                name='fname'
                value={inputs.fname}
                onChange={handleChange}
              />
              <label htmlFor='fname'>First Name:</label>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='lname'
                name='lname'
                value={inputs.lname}
                onChange={handleChange}
              />
              <label htmlFor='lname'>Last Name:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className='form-floating mb-3 '>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={inputs.email}
                onChange={handleChange}
              />
              <label htmlFor='email'>Email:</label>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className='form-floating mb-3 '>
              <input
                type='tel'
                className='form-control'
                id='phone'
                name='phone'
                value={inputs.phone}
                onChange={handleChange}
              />
              <label htmlFor='phone'>Phone:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4 offset-4 text-center mb-3'>
            {inputs.image && (
              <img
                className='user-image rounded-image'
                src={
                  inputs.user_image === ''
                    ? placeholder
                    : `../../../upload/${inputs.image}`
                }
                alt={`${inputs.fname}-${inputs.lname}`}
              />
            )}
          </div>
        </div>
        <div className='row '>
          <div className='col-12 col-sm-8 col-md-6  offset-md-2'>
            <div className='mb-3'>
              <input
                filename={file}
                className='form-control'
                type='file'
                id='file'
                name='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor='file' className='form-label'>
                Upload Image | - 10MB | 350x350px
              </label>
            </div>
          </div>
          <div className='col-12 col-sm-4 col-md-3 mb-3'>
            <button className='btn btn-secondary' onClick={handleUpdateImage}>
              Change Image
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 col-lg-5'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='street'
                name='street'
                value={inputs.street}
                onChange={handleChange}
              />
              <label htmlFor='street'>Street/Address:</label>
            </div>
          </div>
          <div className='col-6 col-lg-1'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='street_nr'
                name='street_nr'
                value={inputs.street_nr}
                onChange={handleChange}
              />
              <label htmlFor='street_nr'>Nr:</label>
            </div>
          </div>
          <div className='col-6 col-lg-2'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='post_nr'
                name='post_nr'
                value={inputs.post_nr}
                onChange={handleChange}
              />
              <label htmlFor='post_nr'>Post Nr:</label>
            </div>
          </div>
          <div className='col-12 col-lg-4'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='living_place'
                name='living_place'
                value={inputs.living_place}
                onChange={handleChange}
              />
              <label htmlFor='living_place'>Living Place:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-6'>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='pid'
                name='pid'
                value={inputs.pid}
                onChange={handleChange}
              />
              <label htmlFor='pid'>Personal Id:</label>
            </div>
          </div>
          <div className='col col-md-6'>
            <div className='form-floating mb-3 '>
              <input
                type='date'
                className='form-control'
                id='birth_date'
                name='birth_date'
                value={inputs.birth_date}
                onChange={handleChange}
              />
              <label htmlFor='birth_date'>Birth date:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <div className='form-floating mb-3 '>
              <select
                className='form-select'
                id='role'
                name='role'
                aria-label='Select member role'
                value={inputs.role}
                onChange={handleChange}
              >
                {/* <option value=''>Select member role</option> */}
                <option value='member'>Member</option>
                <option value='trainer'>Trainer</option>
                <option value='competitor'>Competitor</option>
              </select>
              <label htmlFor='role'>Role:</label>
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className='form-floating mb-3 '>
              <select
                className='form-select'
                id='rank'
                name='rank'
                aria-label='Select member rank'
                value={inputs.rank}
                onChange={handleChange}
              >
                {/*  <option value=''>Select member rank</option> */}

                {belts.belts.map((belt) => (
                  <option key={belt.id} value={belt.color}>
                    {belt.belt}
                  </option>
                ))}
              </select>
              <label htmlFor='rank'>Rank/Belt:</label>
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <div className='form-floating mb-3 '>
              <select
                className='form-select'
                id='status'
                name='status'
                aria-label='Select member status'
                value={inputs.status}
                onChange={handleChange}
              >
                {/* <option value=''>Select member status</option> */}

                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
              <label htmlFor='status'>Status:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='form-floating mb-3'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={inputs.password}
                onChange={handleChange}
              />
              <label htmlFor='password'>Password:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 d-grid gap-2 d-md-flex justify-content-center mt-5'>
            <button
              className='btn btn-primary '
              type='button'
              onClick={handleSubmit}
            >
              Update User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
