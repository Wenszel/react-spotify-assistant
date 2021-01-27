import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadList from './DownloadList'
import ExportPlaylist from './ExportPlaylist';
const Recommendations =({ token, limit, userId })=>{
    const [recommendations, setRecommendations]=useState([]);
    useEffect(()=>{
        let recommends = ''
        axios(`https://api.spotify.com/v1/me/top/artists?limit=5`, {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ token,
            },
            method: 'GET'
          }).then(listResponse => {
            let {items} = listResponse.data 
            for (let i = 0 ; i<5; i++){
                if(!recommends.includes(items[i].id)) recommends+=items[i].id+",";
            }
            recommends=recommends.slice(0,-1);
            axios(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${recommends}`, {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ token,
            },
            method: 'GET'
            }).then(listResponse => {
            setRecommendations(listResponse.data.tracks);
          })
          })
        
    },[])
    
    return (
<div className="list-table">
      {recommendations.map((item,index) => 
       index< limit ?
        <div key={recommendations.indexOf(item)} className="list">
          <img src={item.album.images[2].url} height="30px"alt="track"/>
          <p>{item.name}</p>
        </div>:null 
     )}   
     <DownloadList list={recommendations} name="recommendations"/>
     <ExportPlaylist userId = {userId} token = {token} uris={getUries(recommendations)}/>
    </div>)
}
const getUries = (recommendations)=>{
  let uries = [];
  recommendations.forEach(item => {
    uries.push(item.uri);
  });
  return uries;
}
export default Recommendations;