import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001'  
  //baseURL: 'http://172.16.16.51:3001'
  //baseURL: 'https://murmuring-eyrie-84778.herokuapp.com'
})

instance.interceptors.request.use( config => {
  let TOKEN = localStorage.getItem('userToken');
  if(TOKEN)
    config.headers.Authorization =  `Bearer ${TOKEN}`
  return config
}, error => Promise.reject( error ) )

export default instance;