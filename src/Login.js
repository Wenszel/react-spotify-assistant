import React, {useState} from 'react'
import {Credentials} from './Credentials'
import './index.css'
import App from './App'
import SpotifyLogin from 'react-spotify-login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
const Login = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userToken, setUserToken] = useState();
  const onSuccess = response => {
    setUserToken(response.access_token);
    handleUnmount();
  }
  const onFailure = response => console.error(response);
  const spotify = Credentials();
  const handleUnmount=()=>{
    setIsLogged(true)
  }
  return( 
    <Router>
        {isLogged ? <Redirect to="/logged"/>:
            <SpotifyLogin 
            className="login-button"
            clientId={spotify.ClientId}
            scope={'user-read-recently-played user-top-read'}
            onSuccess={onSuccess}
            redirectUri={spotify.redirectUri}
            onFailure={onFailure}/>
          }
        <Route path="/logged" >
          {isLogged ? <App token = {userToken}/> : <Redirect to="/"/>}          
        </Route>
    </Router>
  
  );
}
export default Login;
