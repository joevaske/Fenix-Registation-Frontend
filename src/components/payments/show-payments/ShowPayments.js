import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import {
  deletePayment,
  getPayments,
  getPeymentsUser,
  reset,
} from '../../../redux/features/payments/paymentsSlice';
import { fetchUsers } from '../../../redux/features/users/usersSlice';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Loading from '../../layout/loading/Loading';

import PaymentList from './PaymentList';
import SearchBar from '../../search-bar/SearchBar';

import './ShowPayments.css';
import Pagination from '../../pagination/Pagination';

const ShowPayments = () => {
  const dispatch = useDispatch();

  const { payments, paymentsUser, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.payments);

  const { users } = useSelector((state) => state.users);

  const [searchResults, setSearchResults] = useState(paymentsUser);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getPeymentsUser());
    dispatch(getPayments());
    dispatch(fetchUsers());
  }, []);

  const getPaymentUser = (id) => {
    const user = users.find((user) => user.user_id === Number(id));
    if (!user) {
      return 'No user';
    } else {
      return user.user_fname + ' ' + user.user_lname.substring(0, 1) + '.';
    }
  };
  var currMonthName = moment().format('MMMM');
  var prevMonthName = moment().subtract(1, 'month').format('MMMM');

  const lastMonthPayments = paymentsUser.filter(
    (payment) => moment(payment.payment_date).format('MMMM') === prevMonthName
  );
  const currentMonthPayments = paymentsUser.filter(
    (payment) => moment(payment.payment_date).format('MMMM') === currMonthName
  );
  const [searchResultsLastMonth, setSearchResultsLastMonth] =
    useState(lastMonthPayments);

  const [searchResultsCurrentMonth, setSearchResultsCurrentMonth] =
    useState(currentMonthPayments);

  const totalPayments = paymentsUser.reduce(
    (a, v) => (a = a + v.payment_amount),
    0
  );

  const lastMonthTotalPayments = lastMonthPayments.reduce(
    (a, v) => (a = a + v.payment_amount),
    0
  );
  const currentMonthTotalPayments = currentMonthPayments.reduce(
    (a, v) => (a = a + v.payment_amount),
    0
  );

  const onPaymentDelete = (id) => {
    dispatch(deletePayment(id));
    alert('Do you really want to delete this payment?');
    dispatch(reset());
  };

  // Get current posts

  const indexofLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexofLastPayment - itemsPerPage;

  let currentPayments;
  let lastMonthPaymentsList;
  let currentMonthPaymentsList;

  if (!searchResults.length) {
    currentPayments = paymentsUser.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
    lastMonthPaymentsList = lastMonthPayments.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
    currentMonthPaymentsList = currentMonthPayments.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
  }

  if (searchResults.length) {
    currentPayments = searchResults.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
    lastMonthPaymentsList = searchResultsLastMonth.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
    currentMonthPaymentsList = searchResultsCurrentMonth.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
  }

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change Array

  return (
    <div className='show-payments'>
      {isLoading && <Loading />}
      <Tabs
        defaultActiveKey='current-month-payments'
        id='uncontrolled-tab-example'
        className='mb-3'
      >
        <Tab
          eventKey='current-month-payments'
          title={`Current Month Payments - ${currMonthName}`}
        >
          {isSuccess && (
            <>
              <div className='container-fluid'>
                <div className='row my-5'>
                  <div className='col-12'>
                    <h2>Payments in {currMonthName}</h2>
                  </div>
                </div>
                <div className='row mb-4'>
                  <div className='col-12 col-md-5 mb-3'>
                    <SearchBar
                      data={currentMonthPayments}
                      setSearchResults={setSearchResultsCurrentMonth}
                    />
                  </div>
                  <div className='col-12 col-md-5 offset-md-1 text-end'>
                    Total Payments:{' '}
                    <strong>
                      {currentMonthPayments.length} |
                      {currentMonthTotalPayments.toLocaleString(2)}
                    </strong>
                  </div>
                </div>
              </div>

              {!searchResultsCurrentMonth.length ? (
                <>
                  <PaymentList
                    getPaymentUser={getPaymentUser}
                    payments={currentMonthPaymentsList}
                    users={users}
                    onPaymentDelete={onPaymentDelete}
                  />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={currentMonthPayments.length}
                    paginate={paginate}
                  />
                </>
              ) : (
                <>
                  <PaymentList
                    getPaymentUser={getPaymentUser}
                    payments={currentMonthPaymentsList}
                    users={users}
                    onPaymentDelete={onPaymentDelete}
                  />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={currentMonthPayments.length}
                    paginate={paginate}
                  />
                </>
              )}
            </>
          )}
        </Tab>
        <Tab
          eventKey='last-month-payments'
          title={`Last Month Payments - ${prevMonthName}`}
        >
          {isSuccess && (
            <>
              <div className='container-fluid'>
                <div className='row my-5'>
                  <div className='col-12'>
                    <h2>Payments in {prevMonthName}</h2>
                  </div>
                </div>
                <div className='row mb-4'>
                  <div className='col-12 col-md-5 mb-3'>
                    <SearchBar
                      data={lastMonthPayments}
                      setSearchResults={setSearchResultsLastMonth}
                    />
                  </div>
                  <div className='col-12 col-md-5 offset-md-1 text-end'>
                    {prevMonthName} Total Payments:{' '}
                    <strong>
                      {lastMonthPayments.length} |
                      {lastMonthTotalPayments.toLocaleString(2)}
                    </strong>
                  </div>
                </div>
              </div>
              {!searchResultsLastMonth.length ? (
                <>
                  <PaymentList
                    getPaymentUser={getPaymentUser}
                    payments={lastMonthPaymentsList}
                    users={users}
                    onPaymentDelete={onPaymentDelete}
                  />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={lastMonthPayments.length}
                    paginate={paginate}
                  />
                </>
              ) : (
                <>
                  <PaymentList
                    getPaymentUser={getPaymentUser}
                    payments={lastMonthPaymentsList}
                    users={users}
                    onPaymentDelete={onPaymentDelete}
                  />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={lastMonthPayments.length}
                    paginate={paginate}
                  />
                </>
              )}
            </>
          )}
        </Tab>
        <Tab eventKey='all-payments' title='All Payments'>
          {isSuccess && (
            <>
              <div className='container-fluid'>
                <div className='row my-5'>
                  <div className='col-12'>
                    <h2>All Payments</h2>
                  </div>
                </div>
                <div className='row mb-4'>
                  <div className='col-12 col-md-5 mb-3'>
                    <SearchBar
                      data={paymentsUser}
                      setSearchResults={setSearchResults}
                    />
                  </div>
                  <div className='col-12 col-md-5 offset-md-1 text-end'>
                    Total Payments:{' '}
                    <strong>
                      {paymentsUser.length} | {totalPayments.toLocaleString(2)}
                    </strong>
                  </div>
                </div>
              </div>

              {!searchResults.length ? (
                <>
                  <PaymentList
                    getPaymentUser={getPaymentUser}
                    payments={currentPayments}
                    users={users}
                    onPaymentDelete={onPaymentDelete}
                  />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={paymentsUser.length}
                    paginate={paginate}
                  />
                </>
              ) : (
                <>
                  <PaymentList
                    getPaymentUser={getPaymentUser}
                    payments={currentPayments}
                    users={users}
                    onPaymentDelete={onPaymentDelete}
                  />
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={paymentsUser.length}
                    paginate={paginate}
                  />
                </>
              )}
            </>
          )}
        </Tab>
      </Tabs>

      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowPayments;
