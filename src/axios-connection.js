import axios from 'axios';

let TOKEN = localStorage.getItem('userToken');
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  headers:  {'Authorization': 'Bearer ' + TOKEN}
  //baseURL: 'http://172.16.16.51:3001'
  //baseURL: 'https://murmuring-eyrie-84778.herokuapp.com'
})

export default instance;