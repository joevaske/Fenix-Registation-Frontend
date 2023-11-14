import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNewUser } from '../../../redux/features/users/usersSlice';
import './CreateUser.css';
import axios from 'axios';

const CreateUser = () => {
  const dispatch = useDispatch();
  const belts = useSelector((state) => state.ranks);
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
    phone: '',
    image: '',
    street: '',
    street_nr: '',
    post_nr: '',
    living_place: '',
    pid: '',
    birth_date: '',
    access_date: formattedDate,
    role: 'member',
    rank: 'white',
    status: 'active',
    password: '',
  });

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

      /*    console.log(file.name);
      console.log(inputs);
      console.log(res.data); */
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (file) {
      if (file.size >= 10240) {
        alert('File too Big, please select a file less than 10mb');
      } else if (file < 2048) {
        alert('File too small, please select a file greater than 2mb');
      } else {
        upload();
        console.log('Image Added');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.image === '') {
      if (window.confirm('Image not added confirm')) {
        dispatch(addNewUser(inputs));
        navigate('/users');
      }
    } else {
      dispatch(addNewUser(inputs));
      navigate('/users');
    }
  };

  return (
    <div className='create-user container '>
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
                placeholder='Radivoje'
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
                placeholder='Radovanovic'
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
                placeholder='email@gmail.com'
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
                placeholder='+381 63 555 555'
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
                src={`../../../upload/${inputs.image}`}
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
            <button className='btn btn-secondary' onClick={handleAddImage}>
              Add Image
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
                placeholder='Ustanicka'
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
                placeholder='251/2'
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
                placeholder='21000'
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
                placeholder='Novi Sad'
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
                placeholder='Novi Sad'
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
                placeholder='27.02.2001'
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
                onChange={handleChange}
              >
                <option value=''>Select member role</option>
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
                onChange={handleChange}
              >
                <option value=''>Select member rank</option>

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
                onChange={handleChange}
              >
                <option value=''>Select member status</option>

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
                placeholder='Password'
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
              Create User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
