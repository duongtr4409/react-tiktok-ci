import configs from '~/assets/configs';
import axios from 'axios';

const REQUEST = axios.create({
    baseURL: `${configs.API_URL}`,
    timeout: 68000,
});

export default REQUEST;
