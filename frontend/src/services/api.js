import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/signup', userData);
export const logoutUser = () => API.post('/auth/logout');
export const getCurrentUser = () => API.get('/auth/get');

export const getPosts = async() =>await API.get('/posts/get/posts');
export const createPost = (postData) => API.post('/posts/create/posts', postData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/delete/posts/${id}`);

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
