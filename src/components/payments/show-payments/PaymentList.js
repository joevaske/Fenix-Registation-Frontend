import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { PiBookmarkSimple } from 'react-icons/pi';
import './PaymentList.css';

import moment from 'moment';

const PaymentList = ({ payments, getPaymentUser, onPaymentDelete }) => {
  const [data, setData] = useState(payments);
  const [order, setOrder] = useState('ASC');
  const [sorterClick, setSorterClick] = useState(0);

  useEffect(() => {
    setData(payments);
  }, [payments]);

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder('ASC');
    }
  };

  const sortingDate = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) =>
        moment(a[col]) > moment(b[col]) ? 1 : -1
      );
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) =>
        moment(a[col]) < moment(b[col]) ? 1 : -1
      );
      setData(sorted);
      setOrder('ASC');
    }
  };

  const handleSorterClick = (divNum) => () => {
    setSorterClick(divNum);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div
          className='col-12 col-md-1 bg-light p-2 text-start sorter'
          onClick={() => sorting('payment_id')}
        >
          Id:{' '}
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(1)}
              className={sorterClick === 1 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(2)}
              className={sorterClick === 2 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-2 bg-light p-2 text-start sorter'
          onClick={() => sorting('user_fname')}
        >
          Member:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(3)}
              className={sorterClick === 3 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(4)}
              className={sorterClick === 4 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-1 bg-light p-2 text-start sorter'
          onClick={() => sorting('staff_id')}
        >
          Done by:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(5)}
              className={sorterClick === 5 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(6)}
              className={sorterClick === 6 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-1 bg-light p-2 text-left sorter'
          onClick={() => sorting('month')}
        >
          Month:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(7)}
              className={sorterClick === 7 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(8)}
              className={sorterClick === 8 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-2 bg-light p-2 text-start sorter'
          onClick={() => sortingDate('payment_date')}
        >
          Date:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(9)}
              className={sorterClick === 9 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(10)}
              className={sorterClick === 10 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-1 bg-light p-2 text-start sorter'
          onClick={() => sorting('payment_type')}
        >
          Type:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(11)}
              className={sorterClick === 11 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(12)}
              className={sorterClick === 12 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-2 bg-light p-2 text-start sorter'
          onClick={() => sortingDate('last_update')}
        >
          Expiration Date:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(13)}
              className={sorterClick === 13 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(14)}
              className={sorterClick === 14 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div
          className='col-12 col-md-1 bg-light p-2 text-start sorter'
          onClick={() => sorting('payment_amount')}
        >
          Amount:
          <span className=''>
            <VscTriangleUp
              onClick={handleSorterClick(15)}
              className={sorterClick === 15 ? 'active' : 'inactive'}
            />
            <VscTriangleDown
              onClick={handleSorterClick(16)}
              className={sorterClick === 16 ? 'active' : 'inactive'}
            />
          </span>
        </div>
        <div className='col-12 col-md-1 bg-light p-2 text-center'>Action:</div>
      </div>
      {data &&
        data
          /*  .slice()
          .reverse() */
          .map((payment) => (
            <div className='row payment' key={payment.payment_id}>
              <div className='col-12 col-md-1  p-2 text-start payment-id'>
                {' '}
                {moment(payment.payment_date).format('YYYY')} -{' '}
                {payment.payment_id}
              </div>
              <div className='col-12 col-md-2  p-2 text-start payment-user'>
                {' '}
                {payment.user_fname} {payment.user_lname}
                {payment.note && (
                  <span>
                    <Link to={`/update-payment/${payment.payment_id}`}>
                      <PiBookmarkSimple />
                    </Link>
                  </span>
                )}
              </div>
              <div className='col-12 col-md-1  p-2 text-start payment-done-by'>
                {' '}
                {getPaymentUser(payment.staff_id)}
              </div>
              <div className='col-12 col-md-1  p-2 text-start payment-month'>
                {payment.month}
              </div>
              <div className='col-12 col-md-2  p-2 text-start payment-date'>
                {' '}
                {moment(payment.payment_date).format('DD. MM. yyyy. hh:mm')}
              </div>
              <div className='col-12 col-md-1 p-2 text-start payment-type'>
                {' '}
                {payment.payment_type}
              </div>
              <div className='col-12 col-md-2  p-2 text-start payment-exp-date'>
                {moment(payment.exp_date).format('DD. MM. yyyy. hh:mm')}
                {moment() > moment(payment.exp_date) && (
                  <span className='badge text-bg-danger'>expired</span>
                )}
              </div>
              <div className='col-12 col-md-1 px-3 text-center payment-amount'>
                {payment.payment_amount.toLocaleString()}
              </div>
              <div className='col-12 col-md-1  p-2 text-center payment-action'>
                <Link
                  className='btn btn-primary tooltip-custom'
                  to={`/update-payment/${payment.payment_id}`}
                >
                  <FiEdit />
                  <span>Edit </span>
                </Link>
                <button
                  className='btn btn-danger tooltip-custom'
                  onClick={() => {
                    onPaymentDelete(payment.payment_id);
                  }}
                >
                  <FiDelete />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PaymentList;
