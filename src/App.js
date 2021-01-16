import React, {useEffect, useState} from 'react'
import './App.css';
import {Credentials} from './Credentials'
import axios from 'axios'
const App = () => {
  const spotify = Credentials();
  const [token, setToken] = useState('');
  useEffect(()=>{
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      console.log(tokenResponse.data.access_token);
      setToken(tokenResponse.data.access_token);
    });
  },[]);
  

  return(
    <div></div>
  );
  
}
export default App;
