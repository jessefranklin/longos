import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { login,logout } from './actions/csa/auth';
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    console.log('logged in');
    store.dispatch(login(user.uid));
    renderApp();
    if( history.location.pathname === '/CSALogin' ){
      history.push('/orderDashboard');
    } 

  } else {
    console.log('logged out');
    store.dispatch(logout());
    renderApp();
    history.push('/CSALogin');
  }
})

