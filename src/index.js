import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import cartReducer from './store/reducers/cart';
import clientReducer from './store/reducers/client';
import categoriesReducer from './store/reducers/categories';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import { NODE_ENV } from './config';


const rootReducer = combineReducers({
    cart: cartReducer,
    client: clientReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    auth: authReducer,
});

const composeEnhancers = NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}>
    <Router> <App /> </Router>
</Provider>, document.getElementById('root'));

