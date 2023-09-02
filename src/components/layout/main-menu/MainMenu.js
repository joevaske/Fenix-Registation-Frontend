import { Link } from 'react-router-dom';
import './MainMenu.css';

const MainMenu = () => {
  return (
    <div className='main-menu'>
      <div className='logo'>
        <Link to='/'>Fenix Registration</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/create-user'>Create User</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <div className='user'>
            <li>
              <span>Djordje</span>{' '}
            </li>
            <li>
              <span>Logout</span>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
