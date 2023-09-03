import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  /*   const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFnameChanged = (e) => setFname(e.target.value);
  const onLnameChanged = (e) => setLname(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value); */

  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/auth/register',
        inputs
      );
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='register-form'>
      <h1>
        Welcome to Fenix BJJ Team
        <br />
        Register Here
      </h1>
      <form>
        <div className='form-row'>
          <label htmlFor='fname'>First Name: </label>
          <input
            type='text'
            id='fname'
            name='fname'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='lname'>Last Name:</label>
          <input
            type='text'
            id='lname'
            name='lname'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            name='password'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-button'>
          <button
            className='btn btn-action'
            type='button'
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>

        {err && <p className='error-message'>{err}</p>}

        <p>
          You already have an account? Go to <Link to='/login'>Login page</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
