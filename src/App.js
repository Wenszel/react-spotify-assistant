import React, { useLayoutEffect, useState} from 'react';
import axios from 'axios';
import TopSongs from './appComponents/TopSongs';
import TopArtists from './appComponents/TopArtists';
import LatestSongs from './appComponents/LastestSongs';
import './index.css'
const App = (props) => {
  const [renderedList, setRenderedList] = useState('');
  const [requestLimit, setRequestLimit] = useState(20);
  const [userToken] = useState(props.token);
  const [userImage, setUserImage] = useState('');
  const [username, setUsername] = useState('');
  useLayoutEffect(()=>{
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
  const handleGetTopArtistsClick = ()=>{
    setRenderedList("topArtists");
  }
  const handleChangeAmount = (event)=>{
    setRequestLimit(event.target.value);
  }
  return(
    <div className="wrapper">
        <div className="user-welcome">
          <img className="user-image"src={userImage} alt="Profile"/>
          <h1>Hello {username}</h1>
        </div>
        <button onClick={handleGetLatestSongsClick}>Get Latest songs</button>
        <button onClick={handleGetTopSongsClick}>Get Top songs</button>
        <button onClick={handleGetTopArtistsClick}>Get Top artists</button>
        <input type="number" min="1" max="50" onChange={handleChangeAmount} value={requestLimit}/>
        {renderedList === "topSongs" ? <TopSongs key={requestLimit} token={userToken} limit={requestLimit}/> : null}
        {renderedList === "latestSongs" ? <LatestSongs key={requestLimit} token={userToken} limit={requestLimit}/> : null}
        {renderedList === "topArtists" ? <TopArtists key={requestLimit} token={userToken} limit={requestLimit}/> : null}
    </div>
  );
  
}
export default App;
