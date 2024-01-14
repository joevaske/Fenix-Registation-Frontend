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
      <h2 className='text-center mb-5'>
        Welcome to Fenix BJJ Team
        <br />
        Register Here
      </h2>
      <form>
        <div className='row'>
          <div className='col-12 '>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='fname'
                name='fname'
                placeholder='Radivoje'
                onChange={handleChange}
                required
              />
              <label htmlFor='fname'>First Name:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 '>
            <div className='form-floating mb-3 '>
              <input
                type='text'
                className='form-control'
                id='lname'
                name='lname'
                placeholder='Radivoje'
                onChange={handleChange}
                required
              />
              <label htmlFor='lname'>Last Name:</label>
            </div>
          </div>
        </div>
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
