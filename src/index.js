import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './container/App'
import store from './reducks'

import 'react-datepicker/dist/react-datepicker.css';
import './stylesheets/styles.css'


ReactDOM.render(
   <Provider store={store}>
      <App/>
   </Provider>,
   document.getElementById('root')
);
