import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

import SearchBar from '../../search-bar/SearchBar';
import Pagination from '../../pagination/Pagination';

const ShowUsers = () => {
  const dispatch = useDispatch();

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  const [searchResults, setSearchResults] = useState(users);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchCompetitors, setSearchCompetitors] = useState(
    users.filter((user) => user.user_role === 'competitor')
  );
  const [searchTrainers, setSearchTrainers] = useState(
    users.filter((user) => user.user_role === 'trainer')
  );
  const [searchAdmins, setSearchAdmins] = useState(
    users.filter((user) => user.user_role === 'admin')
  );
  const [searchActiveMembers, setSearchActiveMembers] = useState(
    users.filter(
      (user) => user.user_role === 'member' && user.user_status === 'active'
    )
  );
  const [searchInactiveMembers, setSearchInactiveMembers] = useState(
    users.filter((user) => user.user_status === 'inactive')
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [searchResults]);

  const competitors = users.filter((user) => user.user_role === 'competitor');
  const activeCompetitors = users.filter(
    (user) => user.user_role === 'competitor' && user.user_status == 'active'
  );
  const members = users.filter((user) => user.user_role == 'member');

  const activeMembers = users.filter(
    (user) => user.user_role == 'member' && user.user_status == 'active'
  );
  const inactiveMembers = users.filter(
    (user) => user.user_status == 'inactive'
  );
  const trainers = users.filter((user) => user.user_role == 'trainer');
  const activeTrainers = users.filter(
    (user) => user.user_role == 'trainer' && user.user_status == 'active'
  );

  const admins = users.filter((user) => user.user_role == 'admin');
  const activeUsers = users.filter((user) => user.user_status == 'active');
  const inactiveUsers = users.filter((user) => user.user_status == 'inactive');

  const onUserDelete = (id) => {
    dispatch(deleteUser(id));
    alert('Do you really want to delete this user?');
  };

  // Get current posts

  const indexofLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexofLastUser - itemsPerPage;

  /*   let currentUsers;

  if (!searchResults.length) {
    currentUsers = users.slice(indexOfFirstUser, indexofLastUser);
  }
  if (searchResults.length) {
    currentUsers = searchResults.slice(indexOfFirstUser, indexofLastUser);
  } */

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className='show-users '>
      {isLoading && <Loading />}

      <Tabs
        defaultActiveKey='all-members'
        id='uncontrolled-tab-example'
        className='mb-0 users-tab'
      >
        <Tab eventKey='all-members' title='All Members'>
          <ShowUsersHeader
            heading='All Members'
            data={users}
            setSearchResults={setSearchResults}
            analitycsHeading='Total Active Members'
            analitycsData={users}
            analitycsActiveData={activeUsers}
          />

          <UsersList users={searchResults} onUserDelete={onUserDelete} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchResults.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Tab>
        <Tab eventKey='active-members' title='Active Members'>
          <ShowUsersHeader
            heading='Active Members'
            data={activeMembers}
            setSearchResults={setSearchActiveMembers}
            analitycsHeading='Total Active Members'
            analitycsData={activeMembers}
            analitycsActiveData={activeMembers}
          />

          <UsersList users={searchActiveMembers} onUserDelete={onUserDelete} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchActiveMembers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Tab>

        <Tab eventKey='inactive-members' title='Inactive Members'>
          <ShowUsersHeader
            heading='Inactive Members'
            data={inactiveMembers}
            setSearchResults={setSearchInactiveMembers}
            analitycsHeading='Total Inactive Members'
            analitycsData={inactiveMembers}
            analitycsActiveData={inactiveMembers}
          />

          <UsersList
            users={searchInactiveMembers}
            onUserDelete={onUserDelete}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchInactiveMembers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Tab>
        <Tab eventKey='competitors' title='Competitors'>
          <ShowUsersHeader
            heading='Competitors'
            data={competitors}
            setSearchResults={setSearchCompetitors}
            analitycsHeading='Total Competitors'
            analitycsData={competitors}
            analitycsActiveData={activeCompetitors}
          />

          <UsersList users={searchCompetitors} onUserDelete={onUserDelete} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchCompetitors.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Tab>
        <Tab eventKey='trainers' title='Trainers'>
          <ShowUsersHeader
            heading='Trainers'
            data={trainers}
            setSearchResults={setSearchTrainers}
            analitycsHeading='Total Trainers'
            analitycsData={trainers}
            analitycsActiveData={activeTrainers}
          />

          <UsersList users={searchTrainers} onUserDelete={onUserDelete} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchTrainers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Tab>
        <Tab eventKey='admins' title='Admins'>
          <ShowUsersHeader
            heading='Admins'
            data={admins}
            setSearchResults={setSearchAdmins}
            analitycsHeading='Total Admins'
            analitycsData={admins}
            analitycsActiveData={admins}
          />

          <UsersList users={searchAdmins} onUserDelete={onUserDelete} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchAdmins.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Tab>
      </Tabs>

      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowUsers;
