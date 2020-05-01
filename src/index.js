import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducers/auth'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'



const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
      <App/>
  </Provider>
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.register();
