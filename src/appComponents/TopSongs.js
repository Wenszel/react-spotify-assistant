import React, { useEffect, useState } from 'react';
import axios from 'axios';
const TopSongs = (props)=>{
    const [topSongsList, setTopSongsList] = useState([]);
    useEffect(()=>{
      axios('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
        headers:{
          'Accept': 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer '+ props.token,
        },
        method: 'GET'
      }).then(listResponse => {
        setTopSongsList(listResponse.data.items)
      });
    },[])
    return(<ol>
      {topSongsList.map(item => 
      <li key={topSongsList.indexOf(item)}>
        <img src={item.album.images[2].url} alt="track"/>
        {item.name}
      </li>)}
    </ol>)
}
export default TopSongs;