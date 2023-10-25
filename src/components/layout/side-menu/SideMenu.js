import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiStackhawk } from 'react-icons/si';
import {
  BsHouseDoor,
  BsChevronLeft,
  BsChevronDown,
  BsTextIndentRight,
  BsArrowRightShort,
} from 'react-icons/bs';
import { PiUsersThreeBold, PiMoneyLight } from 'react-icons/pi';
import './SideMenu.css';

const SideMenu = () => {
  const [toggleUsers, setToggeUsers] = useState(false);
  const [togglePayments, setToggePayments] = useState(false);
  const [toggleMenu, setToggeMenu] = useState(true);

  const settoggleMenu = () => {
    if (toggleMenu) {
      setToggeMenu(false);
    } else {
      setToggeMenu(true);
    }
  };

  const toggleUserMenu = () => {
    if (toggleUsers) {
      setToggeUsers(false);
    } else {
      setToggeUsers(true);
      setToggePayments(false);
    }
  };
  const togglePaymentsMenu = () => {
    if (togglePayments) {
      setToggePayments(false);
    } else {
      setToggePayments(true);
      setToggeUsers(false);
    }
  };

  const clearToggleMenu = () => {
    setToggePayments(false);
    setToggeUsers(false);
  };
  return (
    <div className={toggleMenu ? 'side-menu small' : 'side-menu'}>
      <div
        className={
          toggleMenu ? 'side-menu-toggler active' : 'side-menu-toggler'
        }
        onClick={settoggleMenu}
      >
        <BsTextIndentRight />
      </div>
      <div className='side-logo'>
        <Link to='/' className='side-logo-icon'>
          <SiStackhawk />
        </Link>
        <Link to='/' className='side-logo-text'>
          FReg
        </Link>
      </div>
      <div className='side-navigation'>
        <nav>
          <ul>
            <li>
              <NavLink to='/' className='nav-link' onClick={clearToggleMenu}>
                <BsHouseDoor /> <span>Dashboard</span>
              </NavLink>
            </li>

            <li className='dropdown-link'>
              <div
                className={toggleUsers ? 'link-desc active' : 'link-desc'}
                onClick={toggleUserMenu}
              >
                <PiUsersThreeBold /> <span>Users</span>
              </div>
              <div
                className={
                  toggleUsers
                    ? 'dropdown-link-icon active'
                    : 'dropdown-link-icon'
                }
                onClick={toggleUserMenu}
              >
                <span>
                  {toggleUsers ? <BsChevronDown /> : <BsChevronLeft />}
                </span>
              </div>

              {toggleUsers && (
                <ul className='slide-right'>
                  <li>
                    <NavLink to='/users' onClick={clearToggleMenu}>
                      <pre>
                        <BsArrowRightShort />
                      </pre>
                      Show Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/create-user' onClick={clearToggleMenu}>
                      <pre>
                        <BsArrowRightShort />
                      </pre>
                      Create User
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className='dropdown-link'>
              <div
                className={togglePayments ? 'link-desc active' : 'link-desc'}
                onClick={togglePaymentsMenu}
              >
                <PiMoneyLight /> <span>Payments</span>
              </div>
              <div
                className={
                  togglePayments
                    ? 'dropdown-link-icon active'
                    : 'dropdown-link-icon'
                }
                onClick={togglePaymentsMenu}
              >
                <span>
                  {togglePayments ? <BsChevronDown /> : <BsChevronLeft />}
                </span>
              </div>

              {togglePayments && (
                <ul className='slide-right'>
                  <li>
                    <NavLink to='/show-payments' onClick={clearToggleMenu}>
                      <pre>
                        <BsArrowRightShort />
                      </pre>
                      Show Payments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/create-payment' onClick={clearToggleMenu}>
                      <pre>
                        <BsArrowRightShort />
                      </pre>
                      New Payment
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
