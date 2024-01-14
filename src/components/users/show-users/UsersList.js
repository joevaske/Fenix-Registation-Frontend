import { useEffect, useState } from 'react';
import placeholder from '../../../images/placeholder.jpg';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete, FiPlusSquare, FiLayers } from 'react-icons/fi';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';

import './UsersList.css';

const UsersList = ({ users, onUserDelete }) => {
  const [data, setData] = useState(users);

  const [order, setOrder] = useState('ASC');
  const [sorterClick, setSorterClick] = useState(0);

  useEffect(() => {
    setData(users);
  }, [users]);

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder('ASC');
    }
  };
  const handleSorterClick = (divNum) => () => {
    setSorterClick(divNum);
  };

  return (
    <div className='container-fluid users-list'>
      <div className='row users-list-heading bg-light'>
        <div
          className='col-12 col-md-1 text-center p-2 sorter'
          onClick={() => sorting('user_image')}
        >
          Img:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(1)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(2)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-6 col-lg-2 p-2 text-start sorter'
          onClick={() => sorting('user_fname')}
        >
          Name:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(3)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(4)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-5 col-lg-2 p-2 text-start sorter'
          onClick={() => sorting('user_phone')}
        >
          Phone:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(5)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(6)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-5 col-lg-3 p-2 text-start sorter'
          onClick={() => sorting('user_email')}
        >
          Email:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(7)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(8)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-2 col-lg-1 p-2 text-start sorter'
          onClick={() => sorting('user_rank')}
        >
          Rank:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(9)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(10)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-3 col-lg-1 p-2 text-start sorter'
          onClick={() => sorting('user_status')}
        >
          Status:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(11)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(12)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div className='col-12 col-md-2 p-2 text-center '>Action</div>
      </div>
      {data &&
        data.map((user) => (
          <div className='row user' key={user.user_id}>
            <div className='col-2 col-md-1 text-center py-2'>
              <img
                className='users-list-image'
                src={
                  user.user_image === ''
                    ? placeholder
                    : process.env.PUBLIC_URL + '/upload/' + user.user_image
                }
                alt={`${user.user_fname}-${user.user_lname}`}
              />
            </div>
            <div className='col-9 col-md-6 col-lg-2 user-name text-start '>
              {' '}
              <h4 className=''>{`${user.user_fname} ${user.user_lname}`}</h4>
            </div>

            <div className='col-12 col-md-5 col-lg-2 user-phone '>
              {user.user_phone}
            </div>
            <div className='col-12 col-md-5 col-lg-3 user-email'>
              {user.user_email}
            </div>
            <div className=' col-6 col-md-2 col-lg-1 rank-user'>
              <div
                className={`user-rank user-rank-${
                  user.user_rank ? user.user_rank : 'white'
                }`}
              >
                <div className='user-rank-1'></div>
                <div className='user-rank-2'></div>
                <div className='user-rank-1'></div>
              </div>
            </div>
            <div className='col-6 col-md-3 col-lg-1 user-status  py-2'>
              {user.user_status === 'active' ? (
                <span className='badge text-bg-success'>active</span>
              ) : (
                <span className='badge text-bg-danger'>inactive</span>
              )}
            </div>
            <div className='col-12 col-lg-2  p-3'>
              <div className='user-action text-center'>
                <Link
                  type='button'
                  className='btn btn-info tooltip-custom'
                  to={`/user-profile/${user.user_id}`}
                >
                  <FiPlusSquare />
                  <span>Show User profile</span>
                </Link>

                <Link
                  type='button'
                  className='btn btn-info tooltip-custom'
                  to={`/user-payments/${user.user_id}`}
                >
                  <FiLayers />
                  <span>Show User payments</span>
                </Link>

                <Link
                  type='button'
                  className='btn btn-dark tooltip-custom '
                  to={`/update-user/${user.user_id}`}
                >
                  <FiEdit />
                  <span>Edit User</span>
                </Link>

                <button
                  type='button'
                  className='btn btn-warning tooltip-custom '
                  onClick={() => {
                    onUserDelete(user.user_id);
                  }}
                >
                  <FiDelete />
                  <span>Delete User</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  /*   const results = searchResults.map((user) => (
    <User key={user.user_id} user={user} onUserDelete={onUserDelete} />
  ));

  const content = results.length ? (
    results
  ) : (
    <div className='row'>
      <div className='col-12'> 
        <p>No Matching Users</p>
      </div>
    </div>
  );
  return (
    <div className='container-fluid bg-light-subtle'>
      <div className='row border-bottom  py-2 d-none d-sm-none d-md-none d-lg-flex'>
        <div className='col-sm-1 fw-bold text-center '>Img</div>
        <div className='col-sm-2 fw-bold'>Name</div>
        <div className='col-sm-2 fw-bold'>Phone</div>
        <div className='col-sm-3 fw-bold'>Email</div>
        <div className='col-sm-1 fw-bold'>Rank</div>
        <div className='col-sm-1 fw-bold text-center'>Status</div>
        <div className='col-sm-2 fw-bold text-center'>Action</div>
      </div>
      {content}
    </div>
  ); */
};

export default UsersList;
