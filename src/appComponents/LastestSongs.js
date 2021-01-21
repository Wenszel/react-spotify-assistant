import React, { useEffect, useState } from 'react';
import axios from 'axios';
const LatestSongs = (props)=>{
    const [latestSongsList, setLatestSongsList] = useState([]);
    useEffect(()=>{
        axios('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ props.token,
            },
            method: 'GET'
          }).then(listResponse => {
            setLatestSongsList(listResponse.data.items);
          })
    },[])
    return(<ol>
      {latestSongsList.map(item => 
      <li key={latestSongsList.indexOf(item)}>
        <img src={item.track.album.images[2].url} alt="track"/>
        {item.track.name}
      </li>)}
    </ol>)
}
export default LatestSongs;