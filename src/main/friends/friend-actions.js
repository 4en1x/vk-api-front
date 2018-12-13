import friendsService from '../../service/friends-service';

const GET_FRIENDS = 'GET_FRIENDS';
const UPDATE_FRIENDS = 'UPDATE_FRIENDS';

function addFriendsValues(data) {
    return {
        type: GET_FRIENDS,
        data,
    };
}

function updateFriendsValues(data, page) {
    return {
        type: UPDATE_FRIENDS,
        friends: data.friends,
        page,
    };
}

export function getFriends(page = 1, handler, t) {
    return (dispatch) => {
        friendsService.getFriends(page)
            .then(res => dispatch(addFriendsValues(res.data)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function updateFriends(page = 1, handler, t) {
    return (dispatch) => {
        friendsService.getFriends(page)
            .then(res => dispatch(updateFriendsValues(res.data, page)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}
