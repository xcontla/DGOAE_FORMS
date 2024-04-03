
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './components/StateProvider'
import Reducer, { initialState } from './components/Reducer'; 
import { APP_URL2 } from './constants';
import { BrowserRouter as Router } from 'react-router-dom';


const DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENTID = process.env.REACT_APP_CLIENTID;

ReactDOM.render(




  <Router basename={APP_URL2}>
    <Auth0Provider domain={DOMAIN} clientId={CLIENTID} redirectUri={window.location.origin + APP_URL2}>
      <StateProvider initialState={initialState} Reducer={Reducer}>

        <App />

      </StateProvider>

    

  </Router>,

  document.getElementById('root')
);

reportWebVitals();


/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './components/StateProvider'
import Reducer, { initialState } from './components/Reducer';import { APP_URL2 } from './constants';


const DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENTID = process.env.REACT_APP_CLIENTID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={DOMAIN} clientId={CLIENTID} redirectUri={window.location.origin + APP_URL2}>
      <StateProvider initialState={initialState} Reducer={Reducer}>
 
        <App />
      
      </StateProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


*/
