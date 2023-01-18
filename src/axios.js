import axios from 'axios';
//this is a local axios

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export default instance;