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
    /*  if (user) {
      navigate('/');
    } */

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
    err === null && navigate('/');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='login-form'>
      <h1>
        Welcome to Fenix BJJ Team!
        <span>Login</span>
      </h1>
      <form>
        <div className='row'>
          <div className='col-12'>
            <div className='form-floating mb-3 '>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                placeholder='email@gmail.com'
                onChange={handleChange}
                required
              />
              <label htmlFor='email'>Email:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 '>
            <div className='form-floating mb-0 '>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                autoComplete='off'
                onChange={handleChange}
                required
              />
              <label htmlFor='password'>Password:</label>
            </div>
          </div>
        </div>
        <div className='form-button'>
          <button
            className='btn btn-primary'
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
