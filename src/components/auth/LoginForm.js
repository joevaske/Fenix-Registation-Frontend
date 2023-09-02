import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
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
      const res = await axios.post('/auth/login', inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='login-form'>
      <h1>
        Welcome to Fenix BJJ Team
        <br />
        Login
      </h1>
      <form>
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
            Login
          </button>
        </div>

        {err && <p className='error-message'>{err}</p>}
        <p>
          Don't you have an account? <Link to='/register'>Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
