const defaultState = {
    id: '',
    user: '',
    isAuth: false
};

const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, id: action.payload.id, user: action.payload.user, isAuth: action.payload.isAuth }
            break;
        default:
            return state;
    }
};

export default user;