import axios from 'axios';

export const fetchReposApi = async (
  page: number,
  days: number
) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const dateStr = date.toISOString().split('T')[0];

  const response = await axios.get(
    'https://api.github.com/search/repositories',
    {
      params: {
        q: `created:>${dateStr}`,
        sort: 'stars',
        order: 'desc',
        page,
      },
    }
  );

  return response.data;
};
