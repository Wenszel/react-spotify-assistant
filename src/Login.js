import React, {useState} from 'react'
import {Credentials} from './Credentials'
import './index.css'
import App from './App'
import SpotifyLogin from 'react-spotify-login';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const Login = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userToken, setUserToken] = useState('');
  let token;
  const onSuccess = async response => {
    token = response.access_token
  handleUnmount()
  }
  const onFailure = response => console.error(response);
  const spotify = Credentials();
  const handleUnmount=()=>{
    setIsLogged(true)
  }
  return(
      
    <Router>
        <Link to="/logged">
        {isLogged ? null:
            <SpotifyLogin 
            
            className="login-button"
            clientId={spotify.ClientId}
            scope={'user-read-recently-played','user-top-read'}
            redirectUri={spotify.redirectUri}
            onSuccess={onSuccess}
            onFailure={onFailure}/>
          }
        </Link>
        <Route path="/logged" >
        
            <App token = {userToken} />
        </Route>
    </Router>
  
  );
}
export default Login;
