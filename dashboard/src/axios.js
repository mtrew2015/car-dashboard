import axios from 'axios';

export const server = axios.create({
    baseURL: 'https://reactcars-f984.restdb.io/rest/',
    timeout: 5000,
    headers:{'x-apikey': process.env.REACT_APP_API_KEY}
})