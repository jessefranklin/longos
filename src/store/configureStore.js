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
import pastOrdersReducer from '../reducers/csa/pastOrders';
import authReducer from '../reducers/csa/auth';
import csaOrderReducer from '../reducers/csa/csaOrderReducer';
import {reducer as notifications} from 'react-notification-system-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let stateLoader = new StateLoader();

const reducers = {
    settings: configReducer,
    profile: profileReducer,
    products: productsReducer,
    filters: filterReducer,
    order: orderReducer,
    cart: cartReducer,
    orders: ordersReducer,
    pastorders: pastOrdersReducer,
    auth: authReducer,
    csaOrder: csaOrderReducer,
    notifications
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
        console.log(store.getState());
        stateLoader.saveState(store.getState());

    });
    
    return store;
};

