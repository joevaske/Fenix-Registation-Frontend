import JsPDF from 'jspdf';

import './ShowUsersHeader.css';
import SearchBar from '../../search-bar/SearchBar';

const ShowUsersHeader = ({ users, setSearchResults }) => {
  const generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');
    report.html(document.querySelector('#users-list')).then(() => {
      report.save('report.pdf');
    });
  };
  return (
    <div className='users-header'>
      <div className='users-header-top'>
        <div className='users-header-left'>Members | Admins</div>
        <div className='users-header-right'>
          <p>
            Total members: <span>150 </span>
          </p>
          <p>
            Active members: <span>120 </span>
          </p>
        </div>
      </div>
      <div className='users-header-bottom'>
        <div className='users-header-bottom-left'>
          {' '}
          <h2>Members:</h2>
          <button className='btn'>Add new</button>
          <SearchBar data={users} setSearchResults={setSearchResults} />
        </div>
        <div className='users-header-bottom-right'>
          <button className='btn' onClick={generatePDF}>
            Export Members PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowUsersHeader;
