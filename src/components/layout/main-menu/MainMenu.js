import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import placeholder from '../../../images/placeholder.jpg';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../../redux/features/auth/authSlice';
import './MainMenu.css';

import { getPosts } from '../../../redux/features/posts/postsSlice';

import { BsInfoCircle } from 'react-icons/bs';

const MainMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { posts } = useSelector((state) => state.posts);

  /* const userPosts = posts.filter((post) => post.post_to === user.user_id); */

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className='main-menu'>
      <nav>
        <ul>
          <div className='menu-user'>
            {user && (
              <>
                <li>
                  <Dropdown data-bs-theme='dark' className='messages-dropdown'>
                    <Dropdown.Toggle
                      id='dropdown-button-dark-example1'
                      variant='secondary'
                      size='sm'
                    >
                      <BsInfoCircle className='mb-1' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu drop='start'>
                      <Dropdown.Item href='#/action-1' active>
                        Messages
                      </Dropdown.Item>
                      <Dropdown.Divider />

                      {posts &&
                        posts
                          .filter((post) => post.post_to === user.user_id)
                          .map((post) => (
                            <Dropdown.Item
                              key={post.post_id}
                              href={`/show-post/${post.post_id}`}
                            >
                              {post.post_title}
                            </Dropdown.Item>
                          ))}
                      <Dropdown.Item href='#/action-4'>Message 1</Dropdown.Item>
                      <Dropdown.Item href='#/action-4'>Message 2</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            )}
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
                  <Link to={`/user-profile/${user.user_id}`}>
                    <span>{user.user_fname} </span>
                    <img
                      className='users-list-image-sm'
                      src={
                        user.user_image === ''
                          ? placeholder
                          : process.env.PUBLIC_URL +
                            '/upload/' +
                            user.user_image
                      }
                      alt={`${user.user_fname}-${user.user_lname}`}
                    />
                  </Link>
                </li>
                <li>
                  <button
                    type='button'
                    className='btn btn-sm btn-dark user-logout'
                    onClick={onLogout}
                  >
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
