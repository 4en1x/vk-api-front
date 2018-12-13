const groupReducer = (state = {}, action) => {
    switch (action.type) {
    case 'GET_GROUPS':
        return { ...state, groups: action.data.groups, totalPages: action.data.count };
    case 'GET_WALL':
        return { ...state, posts: action.data.posts, loadedPage: 1 };
    case 'UPDATE_WALL':
        return { ...state, posts: state.posts.concat(action.posts), loadedPage: action.page };

    default:
        return state;
    }
};

export default groupReducer;
