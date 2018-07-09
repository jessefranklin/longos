import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from '../reducers/auth';
import productsReducer from '../reducers/products';
import cartReducer from '../reducers/cart';
import filterReducer from '../reducers/filters';
import { StateLoader } from "../state.loader"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let stateLoader = new StateLoader();

export default () => {
    const store = createStore(
        combineReducers({
            profile: profileReducer,
            products: productsReducer,
            filters: filterReducer,
            cart: cartReducer
        }),
        // State persist
        stateLoader.loadState(),
        composeEnhancers(applyMiddleware(thunk))
    );
    
    store.subscribe(() => {
        // State persist
        // TOTO bring in throttle
        stateLoader.saveState(store.getState());

        console.log(store.getState());
    });
    
    return store;
};

