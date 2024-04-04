import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import { addNewPost, reset } from '../../../redux/features/posts/postsSlice';

import axios from 'axios';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state.postTypes);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const date = new Date();

  //set current use

  // sheck if he is admin

  // Define type of posts and post status in Redux

  const [post, setPost] = useState({
    post_author: user ? user.user_id : 74,
    post_date: date.toString(),
    post_title: '',
    post_content: '',
    post_status: 'active',
    post_type: 'news',
    post_image: '',
  });

  const [err, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image upload

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData, config);
      setPost((prev) => ({ ...prev, post_image: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (file) {
      if (file.size >= 153600) {
        alert('File too Big, please select a file less than 150kb');
      } else if (file < 2048) {
        alert('File too small, please select a file greater than 2mb');
      } else {
        upload();
        console.log('Image Added');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewPost(post));

    console.log(post);
    navigate('/posts');
  };

  return (
    <div className='create-post container'>
      <form encType='multipart/form-data'>
        <div className='row mt-5'>
          <div className='col-12'>
            <div className='form-floating mb-3'>
              <input
                type='text'
                id='post_title'
                name='post_title'
                placeholder='Post Title'
                className='form-control'
                value={post ? post.post_title : ''}
                onChange={handleChange}
              />
              <label htmlFor='post_title'>Post Title:</label>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 col-md-4'>
            <div className='form-floating mb-3 '>
              <select
                className='form-select'
                id='post_type'
                name='post_type'
                aria-label='Select Post type'
                onChange={handleChange}
              >
                {types.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
              <label htmlFor='post_type'>Select Post Type:</label>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4 offset-4 text-center mb-3'>
            {post.post_image && (
              <img
                className='user-image rounded-image'
                src={`../../../upload/${post.post_image}`}
                alt={`${post.post_title}`}
              />
            )}
          </div>
        </div>

        <div className='row '>
          <div className='col-12 col-sm-8 col-md-6  offset-md-2'>
            <div className='mb-3'>
              <input
                filename={file}
                className='form-control'
                type='file'
                id='file'
                name='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor='file' className='form-label'>
                Upload Image | - 100MB | 350x350px
              </label>
            </div>
          </div>
          <div className='col-12 col-sm-4 col-md-3 mb-3'>
            <button className='btn btn-secondary' onClick={handleAddImage}>
              Add Image
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <div className='form-floating'>
              <textarea
                className='form-control'
                placeholder='Post Text Here'
                id='post_content'
                name='post_content'
                value={post ? post.post_content : ''}
                onChange={handleChange}
              ></textarea>
              <label htmlFor='post_content'>Post Text Here</label>
            </div>
          </div>
        </div>
        <div className='row text-end mt-3'>
          <div className='col'>
            <button
              className='btn btn-primary '
              type='button'
              onClick={handleSubmit}
            >
              Post Now!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
