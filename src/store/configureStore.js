import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from '../reducers/auth';
import productsReducer from '../reducers/products';
import cartReducer from '../reducers/cart';
import orderReducer from '../reducers/order';
import filterReducer from '../reducers/filters';
import configReducer from '../reducers/config';
import { StateLoader } from '../state.loader';
import ordersReducer from '../reducers/csa/orders';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let stateLoader = new StateLoader();

const reducers = {
    settings: configReducer,
    profile: profileReducer,
    products: productsReducer,
    filters: filterReducer,
    order: orderReducer,
    cart: cartReducer,
    orders: ordersReducer
}


export default () => {
    const store = createStore(
        combineReducers(
            reducers
        ),
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

