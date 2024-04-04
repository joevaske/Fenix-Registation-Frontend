import React from 'react';
import ShowVideos from './ShowVideos';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getVideos,
  getRoyDeanVideos,
} from '../../../redux/features/youtube/youtubeSlice';

import Loading from '../../layout/loading/Loading';

const Videos = () => {
  const dispatch = useDispatch();

  const { videos, royDeanVideos, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.youtube);

  useEffect(() => {
    dispatch(getVideos());
    dispatch(getRoyDeanVideos());
  }, []);
  return (
    <div className='videos container-fluid'>
      {isLoading && <Loading />}
      <ShowVideos videos={videos} />
      <ShowVideos videos={royDeanVideos} />
    </div>
  );
};

export default Videos;
