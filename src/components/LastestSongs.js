import React, { useContext, useEffect, useState } from 'react';
import ListImage from './ListImage';
import { LimitContext } from '../App'
import { TokenContext } from '../Login';
import axios from 'axios';

const LatestSongs = ({changeSong})=>{
    const limit = useContext(LimitContext);
    const token = useContext(TokenContext);
    const [latestSongsList, setLatestSongsList] = useState([]);
    const formatDate = (date)=>{
      let year = date.slice(0,4);
      let month = date.slice(5,7);
      let day = date.slice(8,10);
      let hour = date.slice(11,16);
      return hour + " " + day + "-" + month +" -" + year
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
            console.log(listResponse.data.items);
            setLatestSongsList(listResponse.data.items);
          })
    },[token])
    return(<div>
      {latestSongsList.map((item,index) => 
       index<limit ? 
        <div key={latestSongsList.indexOf(item)} className="list">
          <ListImage image={item.track.album.images[2].url} uri={item.track.uri} changeSong={changeSong}/>
          <p>{item.track.name}</p>
          <p>{formatDate(item.played_at)}</p>
        </div>: null)}
    </div>)
}
export default LatestSongs;