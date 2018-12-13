const historyReducer = (state = {}, action) => {
    switch (action.type) {
    case 'GET_HISTORY':
        return { ...state, history: action.data.history, totalPages: action.data.count };

    default:
        return state;
    }
};

export default historyReducer;
