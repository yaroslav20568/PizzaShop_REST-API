const defaultState = {
    pizzas: [],
    isLoaded: false
};

const pizzas = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {...state, pizzas: action.payload}
            break;
        case 'SET_LOADED':
            return {...state, isLoaded: action.payload}
        default:
            return state;
    }
};

export default pizzas;