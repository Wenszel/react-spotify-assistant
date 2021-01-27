import React, { useEffect, useState } from 'react';
import DownloadList from './DownloadList'
import axios from 'axios';
const TopArtists = ({ token, limit })=>{
    const [topArtistsList, setTopArtistsList] = useState([]);
    useEffect(()=>{
        axios(`https://api.spotify.com/v1/me/top/artists?limit=50`, {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ token,
            },
            method: 'GET'
          }).then(listResponse => {
            setTopArtistsList(listResponse.data.items);
          })
    },[])
    return(
    <div className="list-table">
      {topArtistsList.map((item,index) => 
       index< limit ?
        <div key={topArtistsList.indexOf(item)} className="list">
          <img src={item.images[2].url} height="30px"alt="track"/>
          <p>{item.name}</p>
        </div>:null 
     )}   
     <DownloadList list={topArtistsList} name="TopArtistsList"/>
    </div>)
}
export default TopArtists;