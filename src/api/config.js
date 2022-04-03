import axios from "axios";


axios.defaults.baseURL = 'https://fwa-ec-quiz.herokuapp.com';

axios.interceptors.request.use( (req) => {
    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    return req
}, function (error) {
    return Promise.reject(error)
})