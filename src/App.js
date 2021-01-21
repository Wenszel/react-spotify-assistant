import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'
const App = (props) => {
  const [userToken] = useState(props.token)
  const [songsList, setSongsList] = useState([]);
  const [userImage, setUserImage] = useState('');
  const [username, setUsername] = useState('');
  useEffect(()=>{
    axios('https://api.spotify.com/v1/me', {
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ userToken,
      },
      method: 'GET'
    }).then(listResponse => {
      setUsername(listResponse.data.display_name);
      setUserImage(listResponse.data.images[0].url);
    })
  },[])
  const getSongs = ()=>{
    axios('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ userToken,
      },
      method: 'GET'
    }).then(listResponse => {
      setSongsList(listResponse.data.items);
    })
  }
  const handleGetSongsClick = ()=>{
    getSongs();
  }
  return(
    <div className="wrapper">
        <div className="user-welcome">
          <img className="user-image"src={userImage} alt="Profile"/>
          <h1>Hello {username}</h1>
        </div>
        <button onClick={handleGetSongsClick}>Get songs</button>
        <ul>
        {songsList.map(item=><li>{item.track.name}</li>)}
        </ul>
    </div>
    
  );
  
}
export default App;
