import axios from 'axios';

axios.defaults.withCredentials = true;

function getGroups(page = 1, filter = '') {
    return axios.get(`http://localhost:8080/groups?page=${page}&filter=${filter}`);
}

function getWall(page = 1, userId) {
    return axios.get(`http://localhost:8080/groups/${userId}?page=${page}`);
}

function subscribe(groupId) {
    return axios.post('http://localhost:8080/groups/subscribe', {
        groupId,
    });
}

function like(groupId, postId, status) {
    return axios.post(`http://localhost:8080/groups/${groupId}/post/${postId}/like`, {
        status,
    });
}

function unsubscribe(groupId) {
    return axios.post('http://localhost:8080/groups/unsubscribe', {
        groupId,
    });
}

const groupService = {
    getGroups,
    subscribe,
    unsubscribe,
    getWall,
    like,
};

export default groupService;
