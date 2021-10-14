import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '9da737b22eea1d12a3b139f732fd2a22',
        language: 'es-ES'
    }
});

export default movieDB;