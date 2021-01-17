import React, {useState} from 'react'
import {Credentials} from './Credentials'
import axios from 'axios'
import './index.css'
const App = (props) => {
  const [userToken, setUserToken] = useState('');
  const [songsList, setSongsList] = useState([]);
  const getLastestSongs = ()=>{
    console.log(props.token)
    axios('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + props.token,
      },
      method: 'GET'
    }).then(listResponse => {
      setSongsList(listResponse.data.items);
        return <ul>{songsList.map(element => <li>{element.track.track}</li>)}</ul>
    })
  }
  return(
    <div>
        <h1>Witaj użytkowniku</h1>
        <button onClick={getLastestSongs}>Get songs</button>
    </div>
  );
  
}
export default App;
