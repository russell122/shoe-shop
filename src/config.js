export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://7402571ecc17c5c9.mokky.dev';

export const API_ENDPOINTS = {
  baskets: `${API_BASE_URL}/baskets`,
  bookmarked: `${API_BASE_URL}/bookmarked`,
  products: `${API_BASE_URL}/products`,
  slider: `${API_BASE_URL}/shoe-slider`,
  chart: `${API_BASE_URL}/chart-data`,
  auth: `${API_BASE_URL}/auth`,
  register: `${API_BASE_URL}/register`
}; 