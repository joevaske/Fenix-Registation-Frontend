import User from './User';
import './UsersList.css';
const UsersList = ({ searchResults, onUserDelete }) => {
  const results = searchResults.map((user) => (
    <User key={user.user_id} user={user} onUserDelete={onUserDelete} />
  ));

  const content = results.length ? (
    results
  ) : (
    <article>
      <p>No Matching Users</p>
    </article>
  );
  return (
    <div className='users-list' id='users-list'>
      <div className='users-list-header'>
        <div className='image'>Image</div>
        <div className='name'>Name</div>
        <div className='phone'>Phone</div>
        <div className='email'>Email</div>
        <div className='rank'>Rank</div>
        <div className='status'>Status</div>
        <div className='action'>Action</div>
      </div>
      {content}
    </div>
  );
};

export default UsersList;
