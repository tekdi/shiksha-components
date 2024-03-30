import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers.tenantid = '4783a636-1191-487a-8b09-55eca51b5036';
    config.headers.tenantid = 'fbe108db-e236-48a7-8230-80d34c370800';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
