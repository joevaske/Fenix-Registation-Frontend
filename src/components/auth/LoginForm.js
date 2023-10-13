import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../redux/features/auth/authSlice';
import { fetchUsers } from '../../redux/features/users/usersSlice';

import './LoginForm.css';

import Loading from '../layout/loading/Loading';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(inputs));
    dispatch(fetchUsers());
    navigate('/');
  };

  if (isLoading) {
    return <Loading />;
  }
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
            autoComplete='off'
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
