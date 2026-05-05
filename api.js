import axios from 'axios';

// Use a relative base URL — Vite's dev server proxy forwards /api/* to the Express backend (see vite.config.js).
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('melody_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const postsAPI = {
  getFeed: () => api.get('/posts'),
  createPost: (data) => api.post('/posts', data),
  likePost: (id) => api.put(`/posts/${id}/like`),
  commentPost: (id, text) => api.post(`/posts/${id}/comment`, { text }),
};

export const usersAPI = {
  getUser: (id) => api.get(`/users/${id}`),
  followUser: (id) => api.put(`/users/follow/${id}`),
};

export const musicAPI = {
  getTrending: () => api.get('/music/trending'),
};

export default api;
