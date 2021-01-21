import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'
const App = (props) => {
  const [userToken] = useState(props.token)
  const [latestSongsList, setLatestSongsList] = useState([]);
  const [topSongsList, setTopSongsList] = useState([]);
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
  const getLatestSongs = ()=>{
    axios('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ userToken,
      },
      method: 'GET'
    }).then(listResponse => {
      setLatestSongsList(listResponse.data.items);
    })
  }
  const getTopSongs = ()=>{
    axios('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ userToken,
      },
      method: 'GET'
    }).then(listResponse => {
      setTopSongsList(listResponse.data.items)
    })
  }
  const handleGetLatestSongsClick = ()=>{
    getLatestSongs();
  }
  const handleGetTopSongsClick = ()=>{
    getTopSongs();
  }
  return(
    <div className="wrapper">
        <div className="user-welcome">
          <img className="user-image"src={userImage} alt="Profile"/>
          <h1>Hello {username}</h1>
        </div>
        <button onClick={handleGetLatestSongsClick}>Get songs</button>
        <button onClick={handleGetTopSongsClick}>Get Top songs</button>
        <ul>
        {latestSongsList.map(item=><li>{item.track.name}</li>)}
        </ul>
        <ul>
        {topSongsList.map(item=><li>{item.name}</li>)}
        </ul>
    </div>
    
  );
  
}
export default App;
