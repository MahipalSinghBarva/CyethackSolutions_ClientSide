import React from 'react';
import ReactDOM from 'react-dom/client';
import AlertTemplate from "react-alert-template-basic";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import App from './App';

import { Provider } from 'react-redux';
import store from './Store';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>

      <App />

    </AlertProvider>

  </Provider>

);



