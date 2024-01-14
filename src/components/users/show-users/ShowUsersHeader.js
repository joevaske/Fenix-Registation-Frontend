import SearchBar from '../../search-bar/SearchBar';
import { Link } from 'react-router-dom';

const ShowUsersHeader = ({
  heading,
  data,
  setSearchResults,
  analitycsHeading,
  analitycsData,
  analitycsActiveData,
}) => {
  return (
    <div className='container-fluid'>
      <div className='row my-5'>
        <div className='col-12 col-md-4 mb-3'>
          <h2>{heading}</h2>
        </div>
        <div className='col-12 col-md-8'>
          <Link to='/create-user' className='btn btn-primary'>
            Add new Member
          </Link>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col-12 col-md-5 mb-3'>
          <SearchBar data={data} setSearchResults={setSearchResults} />
        </div>
        <div className='col-12 col-md-5 offset-md-1 text-end'>
          {analitycsHeading}:{' '}
          <strong>
            {analitycsData.length} | {analitycsActiveData.length}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ShowUsersHeader;
