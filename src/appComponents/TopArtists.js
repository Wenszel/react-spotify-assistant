import React, { useEffect, useState } from 'react';
import DownloadList from './DownloadList'
import axios from 'axios';
const TopArtists = (props)=>{
    const [topArtistsList, setTopArtistsList] = useState([]);
    const [downloadList, setDownloadList] = useState();
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
            createDownloadList();
          })
        const createDownloadList = ()=>{
          let list = ""
          topArtistsList.forEach((item, index)=>{
            list+=`${index+1}. ${item.name}\n`
          })
          console.log(list);
          setDownloadList(list);
        }
    },[])
    return(
    <ol>
      <DownloadList list={downloadList}/>
      {topArtistsList.map((item,index) => 
       index<props.limit ?
        <li key={topArtistsList.indexOf(item)}>
          <img src={item.images[2].url} alt="track"/>
          {item.name}
        </li>:null 
     )}   
    </ol>)
}
export default TopArtists;