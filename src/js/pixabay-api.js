import axios from 'axios';

export const fetchPhotos = async (searchedQuery, currentPage) => {
  const options = {
    params: {
      key: '48346866-c058c3d0a9dd0baa6305ede4b',
      q: searchedQuery,
      page: currentPage,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  return axios.get('https://pixabay.com/api/', options);
};
