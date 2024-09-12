import { Link } from 'react-router-dom';
import './DashboardLinksUsers.css';

const DashboardLinksUsers = () => {
  return (
    <div className='dashboard-links-users'>
      <h4 className='mb-3'>Users</h4>
      <div className='dashboard-links-users-container'>
        <div className='dashboard-links-users-link'>
          <Link className='btn btn-primary btn-md' to='/create-user'>
            New User
          </Link>
        </div>
        <div className='dashboard-links-users-link'>
          <Link className='btn btn-secondary btn-md' to='/users'>
            Show Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardLinksUsers;
