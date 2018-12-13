const friendsReducer = (state = {}, action) => {
    switch (action.type) {
    case 'GET_FRIENDS':
        return { ...state, friends: action.data.friends, loadedPage: 1 };
    case 'UPDATE_FRIENDS':
        return { ...state, friends: state.friends.concat(action.friends), loadedPage: action.page };

    default:
        return state;
    }
};

export default friendsReducer;
