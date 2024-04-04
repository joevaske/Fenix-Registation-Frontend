import React from 'react';
import ShowPosts from './show-posts/ShowPosts';

const Posts = () => {
  return (
    <div>
      <h1 className='lead-1 mt-4 mb-5 mx-2'>Newest Posts</h1>
      <ShowPosts />
    </div>
  );
};

export default Posts;
