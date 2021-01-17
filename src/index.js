import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SpotifyLogin from 'react-spotify-login';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import {Credentials} from './Credentials'
import App from './App';

const spotify = Credentials();
const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <React.StrictMode>
    <App />
    <SpotifyLogin clientId={spotify.ClientId}
    redirectUri={spotify.redirectUri}
    onSuccess={onSuccess}
    onFailure={onFailure}/>,
  </React.StrictMode>,
  document.getElementById('root')
);
