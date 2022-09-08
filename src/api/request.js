import axios from 'axios';

class Request {
    constructor(token = '') {
        this.request = axios.create({
            baseURL: 'http://localhost:3005/',
            //withCredentials: true,
            //timeout: 1000,
            //headers: {'X-Custom-Header': 'foobar'}
        });
        this.token = token;
    }

    get = (url) => {
        return this.request.get(url);
    }

    post = (url, params) => {
        return this.request.post(url, params);
    }

    delete = (url) => {
        return this.request.delete(url);
    };
}

export const request = new Request();