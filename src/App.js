import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TopSongs from './appComponents/TopSongs';
import LatestSongs from './appComponents/LastestSongs';
import './index.css'
const App = (props) => {
  const [renderedList, setRenderedList] = useState('');
  const [userToken] = useState(props.token);
  const [userImage, setUserImage] = useState('');
  const [username, setUsername] = useState('');
  useEffect(()=>{
    axios('https://api.spotify.com/v1/me', {
      headers:{
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ userToken,
      },
      method: 'GET'
    }).then(listResponse => {
      setUsername(listResponse.data.display_name);
      setUserImage(listResponse.data.images[0].url);
    })
  },[])
  const handleGetLatestSongsClick = ()=>{
    setRenderedList("latestSongs");
  }
  const handleGetTopSongsClick = ()=>{
    setRenderedList("topSongs");
  }
  return(
    <div className="wrapper">
        <div className="user-welcome">
          <img className="user-image"src={userImage} alt="Profile"/>
          <h1>Hello {username}</h1>
        </div>
        <button onClick={handleGetLatestSongsClick}>Get Latest songs</button>
        <button onClick={handleGetTopSongsClick}>Get Top songs</button>
        {renderedList === "topSongs" ? <TopSongs token={userToken}/> : null}
        {renderedList === "latestSongs" ? <LatestSongs token={userToken}/> : null}
    </div>
  );
  
}
export default App;
