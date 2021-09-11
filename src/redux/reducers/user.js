const defaultState = {
    user: '',
    isAuth: false
};

const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
            break;
        case 'SET_AUTH':
            return {...state, isAuth: action.payload}
        default:
            return state;
    }
};

export default user;