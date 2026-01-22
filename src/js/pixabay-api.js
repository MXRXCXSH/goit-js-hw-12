import axios from 'axios';

export function getImagesByQuery(query) {
  console.log(query);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = 'https://pixabay.com/api/';
  axios.defaults.baseURL = BASE_URL;
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  };
  return axios
    .get(BASE_URL, { params })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}
