import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import './SearchBar.css';

const SearchBar = ({ data, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(data);
    console.log(e.target.value);

    const resultsArray = data.filter(
      (x) =>
        x.user_fname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        x.user_lname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(resultsArray);
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className='search-bar'>
        <div className='form-row form-group'>
          <input
            className='form-control'
            type='text'
            id='search'
            name='search'
            onChange={handleSearchChange}
            placeholder='Search...'
          />
        </div>
        <div className='search-button'>
          <button
            className='btn btn-search '
            type='button'
            onClick={handleSubmit}
          >
            <HiOutlineSearch />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
