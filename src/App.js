import React, { useLayoutEffect, useState} from 'react';
import axios from 'axios';
import TopSongs from './appComponents/TopSongs';
import TopArtists from './appComponents/TopArtists';
import LatestSongs from './appComponents/LastestSongs';
import './index.css'
import Recommendations from './appComponents/Recommendations';
const App = ({ token }) => {
  const [renderedList, setRenderedList] = useState('');
  const [requestLimit, setRequestLimit] = useState(20);
  const [userToken] = useState(token);
  const [userImage, setUserImage] = useState('');
  const [userId, setUserId] = useState('');
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
      setUserId(listResponse.data.id);
    })
  },[userToken])
  const handleGetLatestSongsClick = ()=>{
    setRenderedList("latestSongs");
  }
  const handleGetTopSongsClick = ()=>{
    setRenderedList("topSongs");
  }
  const handleGetTopArtistsClick = ()=>{
    setRenderedList("topArtists");
  }
  const handlePlaylistManagerClick = ()=>{
    setRenderedList("recommendations");
  }
  const handleChangeAmount = (event)=>{
    let inputValue = event.target.value;
    if (inputValue < 0)setRequestLimit(1);
    else if (inputValue > 50)setRequestLimit(50);
    else setRequestLimit(event.target.value);
  }
  return(
    <div className="wrapper">
        <div className="user-welcome">
          <img className="user-image" src={userImage} alt="Profile"/>
          <h1>Hello {username}</h1>
        </div>
        <button onClick={handleGetLatestSongsClick}>Get Latest songs</button>
        <button onClick={handleGetTopSongsClick}>Get Top songs</button>
        <button onClick={handleGetTopArtistsClick}>Get Top artists</button>
        <button onClick={handlePlaylistManagerClick}>Get recommendations</button>
        <input type="number" min="1" max="50" onChange={handleChangeAmount} value={requestLimit}/>
        {renderedList === "topSongs" ? <TopSongs token={userToken} limit={requestLimit}/> : null}
        {renderedList === "latestSongs" ? <LatestSongs token={userToken} limit={requestLimit}/> : null}
        {renderedList === "topArtists" ? <TopArtists token={userToken} limit={requestLimit}/> : null}
        {renderedList === "recommendations" ? <Recommendations userId={userId} token={userToken} limit={requestLimit}/> : null}
    </div>
  );
  
}
export default App;
