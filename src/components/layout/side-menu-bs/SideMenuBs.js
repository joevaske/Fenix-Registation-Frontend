import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../../redux/features/auth/authSlice';
import { BsHouseDoor } from 'react-icons/bs';
import { PiUsersThree, PiMoneyLight, PiUserCircle } from 'react-icons/pi';

import './SideMenuBs.css';

const SideMenuBs = () => {
  const { user } = useSelector((state) => state.auth);

  const [toggleMenu, setToggeMenu] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isNavCollapsedUsers, setIsNavCollapsedUsers] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleNavCollapseUsers = () =>
    setIsNavCollapsedUsers(!isNavCollapsedUsers);

  const setToggleMenu = () => {
    if (toggleMenu) {
      setToggeMenu(false);
    } else {
      setToggeMenu(true);
    }
  };
  return (
    <div className='sidebar-wrapper'>
      {console.log(user)}
      <aside id='sidebar' className={toggleMenu ? 'collapsed' : ''}>
        <div className='h-100'>
          <div className='sidebar-logo'>
            <a href='#'>FReg</a>
          </div>
          <ul className='sidebar-nav'>
            <li className='sidebar-header'>Users</li>
            <li className='sidebar-item'>
              <Link to='/' className='sidebar-link'>
                <BsHouseDoor /> Dashboard
              </Link>
            </li>
            {user ? (
              <li className='sidebar-item'>
                <Link
                  to={`/user-profile/${user.user_id}`}
                  className='sidebar-link'
                >
                  <PiUserCircle /> Profile
                </Link>
              </li>
            ) : (
              ''
            )}

            <li className='sidebar-item'>
              <a
                href='#'
                className={`${isNavCollapsed ? 'collapsed' : ''} sidebar-link `}
                data-bs-toggle='collapse'
                data-bs-target='#pages'
                aria-expanded='false'
                aria-controls='pages'
                onClick={handleNavCollapse}
              >
                <PiUsersThree /> Users
              </a>
              <ul
                id='pages'
                className={`${
                  isNavCollapsed ? 'collapse' : ''
                } sidebar-dropdown list-unstyled sub-menu`}
                data-bs-parent='#sidebar'
              >
                <li className='sidebar-item '>
                  <NavLink to='/users' className='sidebar-link'>
                    Show Users
                  </NavLink>
                </li>
                <li className='sidebar-item '>
                  <NavLink to='/create-user' className='sidebar-link'>
                    Create User
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-item'>
              <a
                href='#'
                className={`${
                  isNavCollapsedUsers ? 'collapsed' : ''
                } sidebar-link `}
                data-bs-toggle='collapse'
                data-bs-target='#users'
                aria-expanded='false'
                aria-controls='pages'
                onClick={handleNavCollapseUsers}
              >
                <PiMoneyLight /> Payments
              </a>
              <ul
                id='users'
                className={`${
                  isNavCollapsedUsers ? 'collapse' : ''
                } sidebar-dropdown list-unstyled sub-menu`}
                data-bs-parent='#sidebar'
              >
                <li className='sidebar-item'>
                  <NavLink to='/show-payments' className='sidebar-link'>
                    Show Payments
                  </NavLink>
                </li>
                <li className='sidebar-item'>
                  <NavLink to='/create-payment' className='sidebar-link'>
                    New Payment
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <div className='sidebar-main'>
        <nav className='navbar navbar-expand '>
          <button
            onClick={setToggleMenu}
            className='btn'
            type='button'
            data-bs-theme='light'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SideMenuBs;
