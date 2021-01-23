import React, { useEffect, useState } from 'react';
import axios from 'axios';
const TopArtists = (props)=>{
    const [topArtistsList, setTopArtistsList] = useState([]);
    useEffect(()=>{
        axios(`https://api.spotify.com/v1/me/top/artists?limit=50`, {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ props.token,
            },
            method: 'GET'
          }).then(listResponse => {
            setTopArtistsList(listResponse.data.items);
          })
    },[])
    return(<ol>
      {topArtistsList.map((item,index) => 
       index<props.limit ? 
      <li key={topArtistsList.indexOf(item)}>
        <img src={item.images[2].url} alt="track"/>
        {item.name}
      </li>:null)}
    </ol>)
}
export default TopArtists;