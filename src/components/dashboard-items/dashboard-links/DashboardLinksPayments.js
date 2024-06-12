import { Link } from 'react-router-dom';
import './DashboardLinksPayments.css';

const DashboardLinksPayments = () => {
  return (
    <div className='dashboard-links-payments'>
      <h4 className='mb-3'>Payments</h4>
      <div className='dashboard-links-payments-container'>
        <div className='dashboard-links-payments-link'>
          <Link className='btn btn-primary btn-lg' to='/create-payment'>
            New Payment
          </Link>
        </div>
        <div className='dashboard-links-payments-link'>
          <Link className='btn btn-secondary btn-lg' to='/show-payments'>
            Show Payments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardLinksPayments;
