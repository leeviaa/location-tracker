import axios from 'axios';
import {AsyncStorage} from 'react-native';

const instance = axios.create({
  baseURL: 'http://40ebd27b44ff.ngrok.io'
});

// function to append token to each request, takes in two arugments as a function
instance.interceptors.request.use(
  async (config) => {
    //check for token in AsyncStorage
    const token = await AsyncStorage.getItem('token');
    // if we do find token, insert in auth header
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    //return new config object
    return config
  }, 
  (err) => { 
    return Promise.reject(err)
  })

export default instance;