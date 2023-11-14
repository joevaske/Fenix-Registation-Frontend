import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  deleteUser,
  reset,
} from '../../../redux/features/users/usersSlice';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './ShowUsers.css';

import Loading from '../../layout/loading/Loading';
import ShowUsersHeader from './ShowUsersHeader';
import UsersList from './UsersList';

const ShowUsers = () => {
  const dispatch = useDispatch();

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  const [searchResults, setSearchResults] = useState(users);
  /*   const [competitors, setCompetitors] = useState(users); */

  /*   const users = useSelector(selectAllUsers); */
  /*   const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError); */

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUsers());
    }
    setSearchResults(users);
  }, [users]);

  const competitors = users.filter((user) => user.user_role === 'competitor');
  const members = users.filter((user) => user.user_role == 'member');
  const trainers = users.filter((user) => user.user_role == 'trainer');
  const admins = users.filter((user) => user.user_role == 'admin');
  const activeUsers = users.filter((user) => user.user_status == 'active');
  const inactiveUsers = users.filter((user) => user.user_status == 'inactive');

  const onUserDelete = (id) => {
    dispatch(deleteUser(id));
    alert('Do you really want to delete this user?');
    dispatch(reset());
  };
  return (
    <div className='show-users '>
      {isLoading && <Loading />}

      <ShowUsersHeader
        totalMembers={members.length}
        activeUsers={activeUsers.length}
        users={users}
        setSearchResults={setSearchResults}
      />

      <>
        <Tabs
          defaultActiveKey='all-members'
          id='uncontrolled-tab-example'
          className=''
        >
          <Tab eventKey='all-members' title='All Members'>
            {!searchResults.length ? (
              <UsersList searchResults={users} onUserDelete={onUserDelete} />
            ) : (
              <UsersList
                searchResults={searchResults}
                onUserDelete={onUserDelete}
              />
            )}
          </Tab>
          <Tab eventKey='competitors' title='Competitors'>
            <UsersList
              searchResults={competitors}
              onUserDelete={onUserDelete}
            />
          </Tab>
          <Tab eventKey='trainers' title='Trainers'>
            <UsersList searchResults={trainers} onUserDelete={onUserDelete} />
          </Tab>
          <Tab eventKey='admins' title='Admins'>
            <UsersList searchResults={admins} onUserDelete={onUserDelete} />
          </Tab>
          <Tab eventKey='active' title='Active'>
            <UsersList
              searchResults={activeUsers}
              onUserDelete={onUserDelete}
            />
          </Tab>
          <Tab eventKey='inactive' title='In Active'>
            <UsersList
              searchResults={inactiveUsers}
              onUserDelete={onUserDelete}
            />
          </Tab>
          {/*   <Tab eventKey='disabled' title='Disabled' disabled>
            Tab content for Contact
          </Tab> */}
        </Tabs>
      </>

      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowUsers;
