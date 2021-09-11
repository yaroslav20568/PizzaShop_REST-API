import { createStore , combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { pizzas, filter, cart, user } from './reducers/importReducers';

const rootReducer = combineReducers({
    pizzas,
    filter,
    cart,
    user
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;