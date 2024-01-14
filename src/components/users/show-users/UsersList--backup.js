import User from './User';
import './UsersList.css';

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
  );
};

export default UsersList;
