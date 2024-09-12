import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import placeholder from '../../../images/placeholder.jpg';

import { useSelector, useDispatch } from 'react-redux';
// Nije uradjeno do kraja teba dodati pregled i da se oznaci da je procitano

import { fetchUsers } from '../../../redux/features/users/usersSlice';
import {
  updatePost,
  getPosts,
  deletePost,
  reset,
} from '../../../redux/features/posts/postsSlice';

const ShowPost = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.users);

  const id = params.id;
  const singlePost = posts.find((post) => post.post_id === Number(id));
  const sender = users.find((user) => user.user_id === singlePost.post_author);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      {sender && (
        <div>
          <img
            className='users-list-image-sm'
            src={
              sender.user_image === ''
                ? placeholder
                : process.env.PUBLIC_URL + '/upload/' + sender.user_image
            }
            alt={`${sender.user_fname}-${sender.user_lname}`}
          />
          <h3>
            {sender.user_fname} {sender.user_lname}
          </h3>
          <h2>{singlePost.post_title}</h2>
        </div>
      )}
      {/*  */}
      {console.log(singlePost)}
    </div>
  );
};

export default ShowPost;
