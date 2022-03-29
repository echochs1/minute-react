import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import {FirebaseProvider} from './firebase/fbContext';

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  // <React.StrictMode>
  <FirebaseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </FirebaseProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
