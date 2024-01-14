import { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  const [active, setActive] = useState(false);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination my-3 '>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              currentPage === number ? 'active' : 'inactive'
            } `}
          >
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => paginate(number)}
              className='page-link '
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
