/* import { Routes, Route } from 'react-router-dom'; */
import { useSelector, useDispatch } from 'react-redux';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateNewUser from './pages/CreateNewUser';
import MainMenu from './components/layout/main-menu/MainMenu';
import UpdateSingleUser from './pages/UpdateSingleUser';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/layout/footer/Footer';
import ShowUsers from './components/users/show-users/ShowUsers';
import CreatePayment from './components/payments/create-payment/CreatePayment';
import ShowPayments from './components/payments/show-payments/ShowPayments';
import UpdatePayment from './components/payments/update-payment/UpdatePayment';
import SideMenu from './components/layout/side-menu/SideMenu';
import ProfileUser from './components/users/profile-user/ProfileUser';
import PaymentsUser from './components/users/payments-user/PaymentsUser';
import SideMenuBs from './components/layout/side-menu-bs/SideMenuBs';
import UserPayments from './components/users/user-payments/UserPayments';
import PaymentsByUser from './components/payments-by-user/PaymentsByUser';
import HomePageMembers from './components/members-area/members-pages/HomePageMembers';
import Posts from './components/posts/Posts';
import CreatePost from './components/posts/create-post/CreatePost';
import UpdatePost from './components/posts/update-post/UpdatePost';

const Layout = () => {
  return (
    <>
      {/*    <SideMenu /> */}
      <SideMenuBs />

      <div className='main-container'>
        <MainMenu />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/create-user',
        element: <CreateNewUser />,
      },
      {
        path: '/users',
        element: <ShowUsers />,
      },
      {
        path: '/update-user/:id',
        element: <UpdateSingleUser />,
      },
      {
        path: '/user-profile/:id',
        element: <ProfileUser />,
      },
      {
        path: '/user-payments/:id',
        element: <UserPayments />,
      },
      {
        path: '/create-payment',
        element: <CreatePayment />,
      },
      {
        path: '/show-payments',
        element: <ShowPayments />,
      },
      {
        path: '/update-payment/:id',
        element: <UpdatePayment />,
      },
      {
        path: '/payments-by-user',
        element: <PaymentsByUser />,
      },
      {
        path: '/posts',
        element: <Posts />,
      },
      {
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/update-post/:id',
        element: <UpdatePost />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

const routerMember = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePageMembers />,
      },
      {
        path: '/user-profile/:id',
        element: <ProfileUser />,
      },
      {
        path: '/update-user/:id',
        element: <UpdateSingleUser />,
      },
      {
        path: '/user-payments/:id',
        element: <UserPayments />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='App'>
      {user && user.user_role === 'admin' ? (
        <RouterProvider router={router} />
      ) : (
        <RouterProvider router={routerMember} />
      )}
    </div>
  );
}

export default App;
