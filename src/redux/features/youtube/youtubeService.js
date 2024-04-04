import axios from 'axios';

const API_KEY = 'AIzaSyCohTiab7xfCKZUurUPHV5UELRtMlBhQE4';

const KOLAT_PLAYLIST_ID = 'UUC1WdLqjv2YpzZ-0GX6G7fw';
const COLAT_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${KOLAT_PLAYLIST_ID}&key=${API_KEY}`;

const ROY_DEAN_PLAYLIST_ID = 'UUVKca2tBe83V9GR5f-YnW6g';
const ROY_DEAN_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${ROY_DEAN_PLAYLIST_ID}&key=${API_KEY}`;

// Get Videos

const fetchVideos = async () => {
  const response = await axios.get(COLAT_URL);
  return response.data.items;
};

const fetchRoyDeanVideos = async () => {
  const response = await axios.get(ROY_DEAN_URL);
  return response.data.items;
};

const youtubeService = {
  fetchVideos,
  fetchRoyDeanVideos,
};

export default youtubeService;
