import User from './User';
import './UsersList.css';

import Table from 'react-bootstrap/Table';
const UsersList = ({ searchResults, onUserDelete }) => {
  const results = searchResults.map((user) => (
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
    /*     <Table hover responsive='sm'>
      <thead>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Name</th>
          <th scope='col'>Phone</th>
          <th scope='col'>Email</th>
          <th scope='col'>Rank</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </Table> */

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

    /*   <div className='users-list' id='users-list'>
      <div className='users-list-header'>
        <div className='image'>Image</div>
        <div className='name'>Name</div>
        <div className='phone'>Phone</div>
        <div className='email'>Email</div>
        <div className='rank'>Rank</div>
        <div className='status'>Status</div>
        <div className='action'>Action</div>
      </div>
    
    </div> */
  );
};

export default UsersList;
