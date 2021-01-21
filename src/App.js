import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'
const App = (props) => {
  const [songsList, setSongsList] = useState([]);
  useEffect(()=>{
      axios('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers:{
          'Accept': 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer '+props.token,
        },
        method: 'GET'
      }).then(listResponse => {
        setSongsList(listResponse.data.items);
      })
    
  },[])
 
  return(
    <div>
        <h1>Witaj użytkowniku</h1>
        <ul>
        {songsList.map(item=><li>{item.track.name}</li>)}
        </ul>
    </div>
    
  );
  
}
export default App;
