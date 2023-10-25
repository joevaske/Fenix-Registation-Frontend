import React from 'react';
import './Dashboard.css';
import TotalUsers from '../dashboard-items/total-users/TotalUsers';
import TotalPayments from '../dashboard-items/total-payments/TotalPayments';
import LatestUsers from '../dashboard-items/latest-users/LatestUsers';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h2>Dashboard</h2>
      <div className='dashboard-overview'>
        <div className='dashboard-overview-users'>
          <TotalUsers />
        </div>

        <div className='dashboard-overview-payments'>
          <TotalPayments />
        </div>
      </div>
      <div className='dashboard-overview'>
        <div className='dashboard-overview-latest-users'>
          <LatestUsers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
