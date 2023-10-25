import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../../redux/features/users/usersSlice';
import './CreateUser.css';
import axios from 'axios';

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

    if (file.size >= 5120) {
      alert('File too Big, please select a file less than 5mb');
    } else if (file < 2048) {
      alert('File too small, please select a file greater than 2mb');
    } else {
      upload();
      console.log('Image Added');
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
    <div className='create-user'>
      <form encType='multipart/form-data'>
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
          <label htmlFor='phone'>Phone:</label>
          <input type='tel' id='phone' name='phone' onChange={handleChange} />
        </div>
        <div className='form-row'>
          {inputs.image && (
            <img
              className='user-image rounded-image'
              src={`../../../upload/${inputs.image}`}
              alt={`${inputs.fname}-${inputs.lname}`}
            />
          )}

          <label htmlFor='file'>
            Upload Image <br /> - 5MB <br /> 350x350px
          </label>
          <input
            filename={file}
            /*   style={{ display: 'none' }} */
            type='file'
            id='file'
            name='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            style={{ margin: '20px 0 20px 20px', minWidth: '150px' }}
            className='btn'
            onClick={handleAddImage}
          >
            Add Image
          </button>
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
          <label htmlFor='rank'>Rank(belt):</label>
          <select id='rank' name='rank' onChange={handleChange}>
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
