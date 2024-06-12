import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
// Nije uradjeno do kraja teba dodati pregled i da se oznaci da je procitano
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
  const id = params.id;
  const singlePost = posts.find((post) => post.post_id === Number(id));

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return <div>{console.log(singlePost)}Show Post</div>;
};

export default ShowPost;
