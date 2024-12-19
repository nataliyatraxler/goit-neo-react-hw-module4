import axios from 'axios';

const API_KEY = 'YiQ0Q_B1SIZOtpiprk2d-kNylvngJWX08p0qSpCGk8M';
axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchImages = async (query, page = 1) => {
  try {
    // Відправляємо запит до Unsplash API
    const response = await axios.get('/search/photos', {
      params: {
        query,
        page,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${API_KEY}`, 
      },
    });

    console.log('API Response:', response.data); 

    // Перевірка, чи існує масив results
    if (response.status === 200 && response.data.results) {
      return response.data.results; 
    } else {
      console.warn('Unexpected API response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching images:', error.response?.data || error.message);
    return [];
  }
};
