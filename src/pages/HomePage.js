import React from 'react';

import ShowUsers from '../components/users/show-users/ShowUsers';

const HomePage = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'left', padding: '20px' }}>Users List </h2>

      <ShowUsers />
    </div>
  );
};

export default HomePage;
