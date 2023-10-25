import { Link, useNavigate } from 'react-router-dom';
import placeholder from '../../../images/placeholder.jpg';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../../redux/features/auth/authSlice';
import './MainMenu.css';

const MainMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
  return (
    <div className='main-menu'>
      <nav>
        <ul>
          {/*    <li>
            Users
            <ul>
              <li>
                <Link to='/users'>Show Users</Link>
              </li> 
              <li>
                <Link to='/create-user'>Create User</Link>
              </li>
            </ul>
          </li> */}

          <div className='menu-user'>
            {!user && (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className='user-name'>
                  <span>{user.user_fname}</span>
                  <img
                    className='users-list-image-sm'
                    src={
                      user.user_image === ''
                        ? placeholder
                        : process.env.PUBLIC_URL + '/upload/' + user.user_image
                    }
                    alt={`${user.user_fname}-${user.user_lname}`}
                  />
                </li>
                <li>
                  <button className='btn user-logout' onClick={onLogout}>
                    <pre>Logout</pre>
                    <IoLogOutOutline />
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
