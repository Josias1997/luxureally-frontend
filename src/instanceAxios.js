import axios from 'axios';
import { baseURL } from './config';

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json, text/plain, */*',
    }
});

export default instance;