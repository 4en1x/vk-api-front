import axios from 'axios';

axios.defaults.withCredentials = true;

function getFriends(page = 1) {
    return axios.get(`http://localhost:8080/friends?page=${page}`);
}


const friendService = {
    getFriends,
};

export default friendService;
