import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import placeholder1920x1080 from '../../../images/placeholder-1920x1080.jpg';

import { FiEdit, FiDelete } from 'react-icons/fi';

import {
  getPosts,
  deletePost,
  reset,
} from '../../../redux/features/posts/postsSlice';

import { fetchUsers } from '../../../redux/features/users/usersSlice';

import moment from 'moment';

const ShowPosts = () => {
  const dispatch = useDispatch();

  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

  const { users } = useSelector((state) => state.users);

  const getPostUser = (id) => {
    const user = users.find((user) => user.user_id === Number(id));
    if (!user) {
      return 'No user';
    } else {
      return user.user_fname + ' ' + user.user_lname.substring(0, 1) + '.';
    }
  };

  const onPostDelete = (id) => {
    dispatch(deletePost(id));
    alert('Do you really want to delete this post?');
    dispatch(reset());
  };

  useEffect(() => {
    dispatch(getPosts());
    dispatch(fetchUsers());
  }, []);
  return (
    <div className='container-fluid '>
      <div className='row '>
        {posts &&
          posts.map((post) => (
            <div className='col-12 col-md-6'>
              <div className=' shadow-sm p-3 mb-4 bg-body-tertiary rounded'>
                <h3 className='border-bottom pb-2 '>
                  {post.post_title} - {post.post_type}
                </h3>

                <p className='d-flex justify-content-between'>
                  <span>
                    {moment(post.post_date).format(' DD. MMMM YYYY.')}
                  </span>
                  <span>
                    {post.post_author
                      ? getPostUser(post.post_author)
                      : 'Unknown Author'}
                  </span>
                </p>

                {post.post_image ? (
                  <img
                    className='img-fluid'
                    src={`../../../upload/${post.post_image}`}
                    alt={`${post.post_title}`}
                  />
                ) : (
                  <img
                    className='img-fluid'
                    src={placeholder1920x1080}
                    alt={`${post.post_title}`}
                  />
                )}
                <p className='display-6 mt-3'>{post.post_content}</p>
                <div className='d-flex justify-content-end '>
                  <Link
                    className='btn btn-sm btn-primary d-inline-block'
                    to={`/update-post/${post.post_id}`}
                  >
                    <span>Edit Post</span>
                  </Link>
                  <button
                    className=' btn btn-sm btn-danger '
                    onClick={() => {
                      onPostDelete(post.post_id);
                    }}
                  >
                    <span>Delete Post</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {console.log(posts)}
    </div>
  );
};

export default ShowPosts;
