import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { itemListReducer, itemDetailsReducer } from './reducers/itemReducers';
import { authReducer } from './reducers/authReducer';

const reducer = combineReducers({
    itemList: itemListReducer,
    itemDetails: itemDetailsReducer,
    user: authReducer,
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
