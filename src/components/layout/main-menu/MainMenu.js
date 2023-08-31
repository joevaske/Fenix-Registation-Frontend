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
            <Link to='/'>Users</Link>
          </li>
          <li>
            <Link to='/create-user'>Create User</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
