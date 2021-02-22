import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import setAuthToken from '../utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// set up store subscription listener to store users token in localstorage
let currentState = store.getState();

store.subscribe(() => {
    // keep track of previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState();

    if(previousState.auth.token !== currentState.auth.token) {
        const token = currentState.auth.token;
        setAuthToken(token);
    }
});

export default store;