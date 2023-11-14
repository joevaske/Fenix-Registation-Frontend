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
    (payment) => moment(payment.payment_date).format('MMMM') == currMonthName
  );

  const prevMonthPayments = payments.filter(
    (payment) => moment(payment.payment_date).format('MMMM') == prevMonthName
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

  if (!searchResults.length) {
    currentPayments = paymentsUser.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
  }

  if (searchResults.length) {
    currentPayments = searchResults.slice(
      indexOfFirstPayment,
      indexofLastPayment
    );
  }

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='show-payments'>
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <div className='container-fluid'>
            <div className='row my-5'>
              <div className='col-12'>
                <h2>All Payments</h2>
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-12 col-md-5 '>
                <SearchBar
                  data={paymentsUser}
                  setSearchResults={setSearchResults}
                />
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
          {/*  {!searchResults.length ? (
            <PaymentList
              getPaymentUser={getPaymentUser}
              payments={paymentsUser}
              users={users}
              onPaymentDelete={onPaymentDelete}
            />
          ) : (
            <PaymentList
              getPaymentUser={getPaymentUser}
              payments={searchResults}
              users={users}
              onPaymentDelete={onPaymentDelete}
            />
          )} */}
        </>
      )}
      {isError && <p className='error-message'>{message}</p>}
    </div>
  );
};

export default ShowPayments;
