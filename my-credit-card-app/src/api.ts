import axios from 'axios';
import { useRouter } from 'next/router';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Atualize com a URL da sua API Django
});

api.interceptors.request.use((config) => {
  const authToken = sessionStorage.getItem('authToken');

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const router = useRouter();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
