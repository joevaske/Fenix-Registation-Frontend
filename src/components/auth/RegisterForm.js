import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../redux/features/auth/authSlice';

import './RegisterForm.css';
import Loading from '../layout/loading/Loading';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    /*  if (isSuccess || user) {
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

    dispatch(register(inputs));
    navigate('/login');
  };

  if (isLoading) {
    return <Loading />;
  }
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
            autoComplete='off'
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            name='password'
            autoComplete='off'
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
