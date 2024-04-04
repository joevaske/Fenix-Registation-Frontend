import Loading from '../../layout/loading/Loading';

import './ShowVideos.css';

const ShowVideos = ({ videos }) => {
  return (
    <div className='row '>
      {console.log(videos)}

      {videos &&
        videos.map((video, index) => (
          <div className='col-md-4' key={index}>
            <a
              target='_blank'
              href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
            >
              <img
                className='video-thumb'
                src={video.snippet.thumbnails.maxres.url}
                alt=''
              />
              <h3 className='video-title'>{video.snippet.title}</h3>
            </a>
          </div>
        ))}
    </div>
  );
};

export default ShowVideos;
