import axios from 'axios';
import configs from '~/assets/configs';

const REQUEST = axios.create({
    baseURL: `${configs.API_URL}`,
    timeout: 68000,
});

export default REQUEST;
