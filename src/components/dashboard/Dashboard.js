import React from 'react';
import './Dashboard.css';
import TotalUsers from '../dashboard-items/total-users/TotalUsers';
import TotalPayments from '../dashboard-items/total-payments/TotalPayments';
import LatestUsers from '../dashboard-items/latest-users/LatestUsers';
import InactiveUsers from '../dashboard-items/inactive-users/InactiveUsers';
import LatestPayments from '../dashboard-items/latest-payments/LatestPayments';

const Dashboard = () => {
  return (
    <div className='dashboard container-fluid'>
      <h2>Dashboard</h2>
      <div className='row'>
        <div className='col-12 col-md-3'>
          <TotalUsers />
        </div>
        <div className='col-12 col-md-5'>
          <LatestUsers />
        </div>
        <div className='col-12 col-md-4'>
          <InactiveUsers />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-4'>
          <TotalPayments />
        </div>
        <div className='col-12 col-md-8'>
          <LatestPayments />
        </div>
      </div>
      <div className='dashboard-overview'>
        {/* <div className='dashboard-overview-users'>
          <TotalUsers />
        </div>  */}

        {/*  <div className='dashboard-overview-payments'>
          <TotalPayments />
        </div> */}
      </div>
      {/*   <div className='dashboard-overview'>
        <div className='dashboard-overview-latest-users'>
          <LatestUsers />
        </div>
      </div>  */}
    </div>
  );
};

export default Dashboard;
