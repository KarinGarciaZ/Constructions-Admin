import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://localhost:3001'
  baseURL: 'https://murmuring-eyrie-84778.herokuapp.com'
})

export default instance;