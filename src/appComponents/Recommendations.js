import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DownloadList from './DownloadList'
import ExportPlaylist from './ExportPlaylist';
import PropTypes from 'prop-types'
import { LimitContext } from '../App'
import { TokenContext } from '../Login';

const Recommendations =({ userId })=>{
    const limit = useContext(LimitContext);
    const token = useContext(TokenContext);
    const [recommendations, setRecommendations]=useState([]);
    useEffect(()=>{
        let recommends = '';
        axios(`https://api.spotify.com/v1/me/top/artists?limit=5`, {
            headers:{
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer '+ token,
            },
            method: 'GET'
          }).then(listResponse => {
            let {items} = listResponse.data;
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
              console.log(listResponse)
            setRecommendations(listResponse.data.tracks);
          })
          })
    },[token, limit])

    return (
    <div className="list-table">
      {recommendations.map((item,index) => 
        index< limit ?
          <div key={recommendations.indexOf(item)} className="list">
            <img src={item.album.images[2].url} alt="track"/>
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
Recommendations.propTypes = {
  userId: PropTypes.string
}
export default Recommendations;