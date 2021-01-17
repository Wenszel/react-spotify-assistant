import React, {useState} from 'react'
import {Credentials} from './Credentials'
import './index.css'
import App from './App'
import SpotifyLogin from 'react-spotify-login';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const Login = () => {
  const [userToken, setUserToken] = useState('');
  const onSuccess = response => setUserToken(response.access_token);
  const onFailure = response => console.error(response);
  const spotify = Credentials();
  return(
    <Router>
        <Link to="/logged">
            <SpotifyLogin 
            className="login-button"
            clientId={spotify.ClientId}
            scope={'user-read-recently-played','user-top-read'}
            redirectUri={spotify.redirectUri}
            onSuccess={onSuccess}
            onFailure={onFailure}/>
        </Link>
        <Route path="/logged" >
            <App token = {userToken}/>
        </Route>
    </Router>
  );
}
export default Login;
