import React, { useEffect, useState } from 'react';
import axios from 'axios';
const LatestSongs = ({token, limit})=>{
    const [latestSongsList, setLatestSongsList] = useState([]);
    const formatDate = (date)=>{
      let year = date.slice(0,4);
      let month = date.slice(5,7);
      let day = date.slice(8,10);
      let hour = date.slice(11,16);
      return hour+" "+day+"-"+month+"-"+year
    }
    useEffect(()=>{
        axios(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ token,
            },
            method: 'GET'
          }).then(listResponse => {
            setLatestSongsList(listResponse.data.items);

          })
    },[])
    return(<div>
      {latestSongsList.map((item,index) => 
       index<limit ? 
        <div key={latestSongsList.indexOf(item)} className="list">
          <img src={item.track.album.images[2].url} alt="track"/>
          <p>{item.track.name}</p>
          <p>{formatDate(item.played_at)}</p>
        </div>: null)}
    </div>)
}
export default LatestSongs;