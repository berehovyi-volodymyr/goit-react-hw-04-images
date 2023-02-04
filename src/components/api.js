import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export const searchImage = async (search, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      page,
      q: search,
      per_page: 12,
      key: '31788075-b7615e81e6dda1dedffa3dd10',
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return data;
};
