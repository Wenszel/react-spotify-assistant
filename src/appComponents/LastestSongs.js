import React, { useEffect, useState } from 'react';
import axios from 'axios';
const LatestSongs = (props)=>{
    const [latestSongsList, setLatestSongsList] = useState([]);
    useEffect(()=>{
        axios(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
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
      {latestSongsList.map((item,index) => 
       index<props.limit ? 
      <li key={latestSongsList.indexOf(item)}>
        <img src={item.track.album.images[2].url} alt="track"/>
        {item.track.name}
      </li> : null)}
    </ol>)
}
export default LatestSongs;