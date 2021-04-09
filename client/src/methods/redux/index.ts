import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ConnectWeb3 from './reducers/ConnectWeb3'
import PoolReducer from './reducers/PoolReducer';


const reducers = combineReducers({
    ConnectWeb3,
    PoolReducer
});

async function reduxstore() {
    const initstore: any = undefined;


    return createStore(
        reducers,
        initstore,
        composeWithDevTools(
            applyMiddleware(
                thunk,
                // saver
            ),
        ),
    );
}

export default reduxstore;