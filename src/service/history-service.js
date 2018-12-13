import axios from 'axios';

axios.defaults.withCredentials = true;

function getHistory(page = 1) {
    return axios.get(`http://localhost:8080/history?page=${page}`);
}

const historyService = {
    getHistory,
};

export default historyService;
