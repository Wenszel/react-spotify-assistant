import React, { useContext, useEffect, useState } from 'react';
import DownloadList from './DownloadList';
import ListImage from './ListImage';
import { LimitContext } from '../App';
import { TokenContext } from '../Login';
import axios from 'axios';

const TopSongs = ({ changeSong })=>{
    const limit = useContext(LimitContext);
    const token = useContext(TokenContext);
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
            <ListImage image={item.album.images[2].url} uri={item.uri} changeSong={changeSong}/>
            <p>{item.name}</p>
          </div> : null) 
          } 
        <DownloadList name="TopSongsList" list={topSongsList}/>
    </div>)
}
export default TopSongs;