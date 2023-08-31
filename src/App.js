import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateNewUser from './pages/CreateNewUser';
import MainMenu from './components/layout/main-menu/MainMenu';
import UpdateSingleUser from './pages/UpdateSingleUser';

function App() {
  return (
    <div className='App'>
      <MainMenu />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create-user' element={<CreateNewUser />} />
        <Route path='/update-user/:id' element={<UpdateSingleUser />} />
      </Routes>
    </div>
  );
}

export default App;
