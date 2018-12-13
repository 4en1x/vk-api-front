import groupService from '../../service/group-service';


const GET_GROUPS = 'GET_GROUPS';
const GET_WALL = 'GET_WALL';
const UPDATE_WALL = 'UPDATE_WALL';

function addGroupValues(data) {
    return {
        type: GET_GROUPS,
        data,
    };
}

function addWallValues(data) {
    return {
        type: GET_WALL,
        data,
    };
}

function updateWallValues(data, page) {
    return {
        type: UPDATE_WALL,
        posts: data.posts,
        page,
    };
}

export function getGroups(page = 1, filter = '', handler, t) {
    return (dispatch) => {
        groupService.getGroups(page, filter)
            .then(res => dispatch(addGroupValues(res.data)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function getWall(page = 1, groupId, handler, t) {
    return (dispatch) => {
        groupService.getWall(page, groupId)
            .then(res => dispatch(addWallValues(res.data)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function updateWall(page = 1, groupId, handler, t) {
    return (dispatch) => {
        groupService.getWall(page, groupId)
            .then(res => dispatch(updateWallValues(res.data, page)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}
