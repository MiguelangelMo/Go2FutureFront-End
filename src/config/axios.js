import axios from 'axios';

const getAxios = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export default getAxios;
