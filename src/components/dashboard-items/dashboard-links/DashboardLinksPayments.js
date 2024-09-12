import { Link } from 'react-router-dom';
import './DashboardLinksPayments.css';

const DashboardLinksPayments = () => {
  return (
    <div className='dashboard-links-payments mb-3'>
      <h4 className='mb-3'>Payments</h4>
      <div className='dashboard-links-payments-container'>
        <div className='dashboard-links-payments-link'>
          <Link className='btn btn-primary btn-md' to='/create-payment'>
            New Payment
          </Link>
        </div>
        <div className='dashboard-links-payments-link'>
          <Link className='btn btn-secondary btn-md' to='/show-payments'>
            Show Payments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardLinksPayments;
