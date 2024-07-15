import axios, { CanceledError } from 'axios';

export { CanceledError };
const apiClient = axios.create({
  //baseURL: 'https://10.10.248.100',
  baseURL: 'http://localhost:5000',
});

export default apiClient;
