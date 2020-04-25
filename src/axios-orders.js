import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-91494.firebaseio.com/'
});

export default instance;