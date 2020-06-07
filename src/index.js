import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder.js';
import orderReducer from './store/reducers/order.js';
import authReducer from './store/reducers/auth.js';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { watchAuth } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleWare)
));

sagaMiddleWare.run(watchAuth);

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
