import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_PORT}`
});