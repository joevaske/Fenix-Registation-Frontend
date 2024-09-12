import './Dashboard.css';
import TotalUsers from '../dashboard-items/total-users/TotalUsers';
import TotalPayments from '../dashboard-items/total-payments/TotalPayments';
import LatestUsers from '../dashboard-items/latest-users/LatestUsers';
import InactiveUsers from '../dashboard-items/inactive-users/InactiveUsers';
import LatestPayments from '../dashboard-items/latest-payments/LatestPayments';
import ExpiredPayments from '../dashboard-items/expired-payments/ExpiredPayments';
import DebthUsers from '../dashboard-items/debth-users/DebthUsers';
import DashboardLinksPayments from '../dashboard-items/dashboard-links/DashboardLinksPayments';
import DashboardLinksUsers from '../dashboard-items/dashboard-links/DashboardLinksUsers';

const Dashboard = () => {
  return (
    <div className='dashboard container-fluid'>
      <h2>Dashboard</h2>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <DashboardLinksPayments />
        </div>
        <div className='col-12 col-md-6'>
          <DashboardLinksUsers />
        </div>
      </div>

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
        <div className='col-12 col-md-8'>{/*  <LatestPayments /> */}</div>
      </div>
      <div className='row'>
        <div className='col-12 col-xs-6'>
          <LatestPayments />
        </div>
        <div className='col-12 col-xs-6'>
          <ExpiredPayments />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <DebthUsers />
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
