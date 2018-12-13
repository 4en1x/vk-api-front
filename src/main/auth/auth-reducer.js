const authReducer = (
    state = {
        name: '', role: '', isAuthError: true, isRegisterError: true,
    },
    action,
) => {
    switch (action.type) {
    case 'ADD_USER':
        return Object.assign({}, state, action.user, { isAuthError: false });

    case 'REGISTRATION':
        return Object.assign({}, state, {
            isRegisterError: false,
            vkAuthLink: action.vkAuthLink,
            userId: action.userId,
        });

    case 'REMOVE_USER':
        return Object.assign({}, state, action.user, { isAuthError: true });

    default:
        return state;
    }
};

export default authReducer;
