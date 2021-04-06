import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const reducers = combineReducers({

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