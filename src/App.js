/* import { Routes, Route } from 'react-router-dom'; */

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateNewUser from './pages/CreateNewUser';
import MainMenu from './components/layout/main-menu/MainMenu';
import UpdateSingleUser from './pages/UpdateSingleUser';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/layout/footer/Footer';
import ShowUsers from './components/users/show-users/ShowUsers';

const Layout = () => {
  return (
    <>
      <MainMenu />
      <Outlet />
      <Footer />
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
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
