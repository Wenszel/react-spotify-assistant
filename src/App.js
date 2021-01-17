import React, {useEffect, useState} from 'react'
import {Credentials} from './Credentials'
import axios from 'axios'
import SpotifyLogin from 'react-spotify-login';
const App = () => {
  
  const [token, setToken] = useState('');
  const [songsList, setSongsList] = useState([]);
  const spotify = Credentials();
  const onSuccess = response => {
  console.log(response.access_token);
  axios('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
    headers:{
      'Accept': 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + response.access_token,
      
    },
    method: 'GET'
  }).then(listResponse => {
    setSongsList(listResponse.data.items);
  })
  }
  const onFailure = response => console.error(response);

  return(
    <div>
      <SpotifyLogin clientId={spotify.ClientId}
      scope='user-read-recently-played'
      redirectUri={spotify.redirectUri}
      onSuccess={onSuccess}
      onFailure={onFailure}/>
        <ul>
          {songsList.map((track)=><li>{track.track.name} {track.played_at}</li>)}
        </ul>
    </div>
  );
  
}
export default App;
