import axios from 'axios';

const API_URL = '/posts/';

// Create Post

const createPost = async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

// Get Posts

const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update Posts

const editPost = async (post) => {
  const response = await axios.put(API_URL, post);

  const sendPost = {
    post_id: post.post_id,
    post_author: post.post_author,
    post_date: post.post_date,
    post_content: post.post_content,
    post_title: post.post_title,
    post_status: post.post_status,
    post_type: post.post_type,
    post_image: post.post_image,
  };

  response.data.post = sendPost;
  return response;
};

// Delete Post

const removePost = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);
  return response.data;
};

const postsService = {
  createPost,
  fetchPosts,
  editPost,
  removePost,
};

export default postsService;
