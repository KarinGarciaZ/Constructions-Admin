import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://127.0.0.1:3001',
  withCredentials: true,
  baseURL: 'https://construction-system.herokuapp.com/'
})

export default instance;