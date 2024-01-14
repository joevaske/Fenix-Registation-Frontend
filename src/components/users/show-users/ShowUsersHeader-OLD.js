import JsPDF from 'jspdf';
import { NavLink } from 'react-router-dom';

import './ShowUsersHeader.css';
import SearchBar from '../../search-bar/SearchBar';

const ShowUsersHeader = ({ activeUsers, users, setSearchResults }) => {
  const generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');
    report.html(document.querySelector('#users-list')).then(() => {
      report.save('report.pdf');
    });
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-6'>
          {' '}
          <p>
            Total members: <span className='fw-bold'>{users.length} </span>
          </p>
        </div>
        <div className='col-6 text-end'>
          <p>
            Active members: <span className='fw-bold'>{activeUsers} </span>
          </p>
        </div>
      </div>
      <div className='row mb-5 mt-3'>
        <div className='col-6 col-md-12 mb-3 '>
          <h2>Members</h2>
        </div>

        <div className='col-6 col-md-2 text-end'>
          <NavLink to='/create-user' className='btn btn-dark ' type='button'>
            Add new
          </NavLink>
        </div>
        <div className='col-12 col-md-7 mb-3'>
          <SearchBar data={users} setSearchResults={setSearchResults} />
        </div>
        <div className='col-12 col-md-3 text-end'>
          {' '}
          <button className='btn btn-secondary' onClick={generatePDF}>
            Export PDF
          </button>
        </div>
      </div>
    </div>
    /*     <div className='users-header'>
      <div className='users-header-top'>
        <div className='users-header-left'>
          {' '}
          <p>
            Total members: <span>{users.length} </span>
          </p>
        </div>
        <div className='users-header-right'>
          <p>
            Active members: <span>{activeUsers} </span>
          </p>
        </div>
      </div>
      <div className='users-header-bottom'>
        <div className='users-header-bottom-left'>
          {' '}
          <h2>Members:</h2>
          
          <SearchBar data={users} setSearchResults={setSearchResults} />
        </div>
        <div className='users-header-bottom-right'>
          <button className='btn btn-secondary' onClick={generatePDF}>
            Export Members PDF
          </button>
        </div>
      </div>
    </div> */
  );
};

export default ShowUsersHeader;
