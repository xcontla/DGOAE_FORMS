import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './components/StateProvider'
import Reducer, { initialState } from './components/Reducer';import { APP_URL2 } from './constants';


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain='dev-w5pbf864.us.auth0.com' clientId='G1UE0TbeEBLNKDVQ02wF04jL7ybBdCZO' redirectUri={window.location.origin + APP_URL2}>
      <StateProvider initialState={initialState} Reducer={Reducer}>
 
        <App />
      
      </StateProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
