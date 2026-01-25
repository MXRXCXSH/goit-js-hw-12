import axios from 'axios';

export const getImagesByQuery = async query => {
  console.log(query);
  const API_KEY = import.meta.env.VITE_API_KEY;
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
  };
  try {
    const response = await axios.get('', { params });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
