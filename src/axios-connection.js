import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://murmuring-eyrie-84778.herokuapp.com'
})

export default instance;