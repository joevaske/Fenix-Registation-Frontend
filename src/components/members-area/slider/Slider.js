import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../layout/loading/Loading';
import { getPosts } from '../../../redux/features/posts/postsSlice';

import Carousel from 'react-bootstrap/Carousel';

import './Slider.css';

const Slider = () => {
  const dispatch = useDispatch();

  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

  const sliderPosts = posts.filter((post) => post.post_type == 'slider');

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <Carousel className='slider'>
      {isLoading && <Loading />}
      {sliderPosts &&
        sliderPosts.map((post) => (
          <Carousel.Item key={post.post_id}>
            <img
              src={`../../../upload/${post.post_image}`}
              className='d-block w-100'
              alt={post.post_title}
            />
            <Carousel.Caption>
              <h3>{post.post_title}</h3>
              <p>{post.post_content}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Slider;
