import React, { useEffect, useState } from 'react';
import DownloadList from './DownloadList'
import axios from 'axios';
const TopSongs = ({ token, limit })=>{
    const [topSongsList, setTopSongsList] = useState([]);
    useEffect(()=>{
      axios(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`, {
        headers:{
          'Accept': 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer '+ token,
        },
        method: 'GET'
      }).then(listResponse => {
        setTopSongsList(listResponse.data.items)
        
      });
    },[token])
    return(<div className="list-table">
      {topSongsList.map((item, index) => 
        index<limit ? 
          <div key={topSongsList.indexOf(item)} className="list">
            <img src={item.album.images[2].url} alt="track"/>
            <p>{item.name}</p>
          </div> : null) 
          } 
        <DownloadList name="TopSongsList" list={topSongsList}/>
    </div>)
}
export default TopSongs;