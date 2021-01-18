import React, {useEffect, useState} from 'react'
import {Credentials} from './Credentials'
import axios from 'axios'
import './index.css'
const App = (props) => {
  const [userToken, setUserToken] = useState(props.token);
  const [songsList, setSongsList] = useState([]);
  useEffect(()=>{
  const LastestSongs = ()=>{
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
    })
    return <ul>{songsList.map(element => <li>{element.track.track}</li>)}</ul>
  }
})
  return(
    <div>
      <p>{userToken}</p>
        <h1>Witaj użytkowniku</h1>
        <button>Get songs</button>
    </div>
  );
  
}
export default App;
