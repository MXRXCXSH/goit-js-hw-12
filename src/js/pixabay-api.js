import axios from 'axios';

export const getImagesByQuery = async (query, page = 1) => {
  console.log(query);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = 'https://pixabay.com/api/';
  axios.defaults.baseURL = BASE_URL;

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  try {
    const { data } = await axios.get('', { params });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
