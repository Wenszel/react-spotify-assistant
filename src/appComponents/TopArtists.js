import React, { useContext, useEffect, useState } from 'react'
import DownloadList from './DownloadList'
import { LimitContext } from '../App'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'
import { TokenContext } from '../Login'

const Chart = ({ genres })=>{
  const [data, setData] = useState([]);
  useEffect(()=>{
    const createDataObject = () => {
      let labels=[];
      let datasets=[{
        data:[]
      }];
      genres.forEach((item)=>{
        if(!labels.includes(item)){
          labels.push(item);
          datasets[0].data.push(1);
        }else{
          datasets[0].data[labels.indexOf(item)]++
        }
      });
      datasets[0].data = datasets[0].data.filter(( item, index ) => {
        if(item === 1){
          labels.splice(index,1);
        }
        else if(item > 1){
          return item;
        }
      });
      console.log({labels: labels, datasets: datasets});
      return({labels: labels, datasets: datasets});
    }
    setData(createDataObject());
  },[genres])
    return (
      <div className="chart">
        <Pie data={data}></Pie>
      </div>
    )
}
Chart.propTypes = {
  genres: PropTypes.array
}
const TopArtists = ()=>{
    const limit = useContext(LimitContext);
    const token = useContext(TokenContext);
    const [topArtistsList, setTopArtistsList] = useState([]);
    const [genres, setGenres] = useState([]);
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
            let genres = []
            listResponse.data.items.forEach((item)=>{
              genres.push(item.genres);
            });
            setGenres(genres.flat());
          })
    },[token])
    return(
    <div className="list-table">
      {topArtistsList.map((item,index) => 
       index< limit ?
        <div key={topArtistsList.indexOf(item)} className="list">
          <img src={item.images[2].url} alt="track"/>
          <p>{item.name}</p>
        </div>:null 
     )}   
     <DownloadList list={topArtistsList} name="TopArtistsList"/>
     <Chart genres={genres}/>
    </div>)
}
export default TopArtists;