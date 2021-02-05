import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import TopSongs from './appComponents/TopSongs';
import TopArtists from './appComponents/TopArtists';
import SpotifyPlayer from 'react-spotify-web-playback';
import LatestSongs from './appComponents/LastestSongs';
import './index.css'
import CustomRecommendation from './appComponents/CustomRecommendation';
import Recommendations from './appComponents/Recommendations';
import { TokenContext } from './Login';

export const LimitContext = createContext();

const App = () => {
  
  const [renderedList, setRenderedList] = useState('');
  const [requestLimit, setRequestLimit] = useState(20);
  const [playerDisplaying, setPlayerDisplaying] = useState(false);

  const [playerStatus, setPlayerStatus] = useState(false);
  const [currentSong, setCurrentSong] = useState();

  const [userToken] = useState(useContext(TokenContext));

  const [userImage, setUserImage] = useState('');
  const [userId, setUserId] = useState('');
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
      setUserId(listResponse.data.id);
    })
  },[userToken])

  const handleChangeAmount = (event)=>{
    let inputValue = event.target.value;
    if (inputValue < 0) setRequestLimit(1);
    else if (inputValue > 50) setRequestLimit(50);
    else setRequestLimit(event.target.value);
  }

  const handleSongChange = (newSong) => {
    setCurrentSong(newSong);
    setPlayerDisplaying(true);
    setPlayerStatus(true);
  }

  return(
    <>
    <div className="wrapper">
        <div className="user-welcome">
          <img className="user-image" src={userImage} alt="Profile"/>
          <h1>Hello {username}</h1>
          
        </div>
        <button onClick={()=>{setRenderedList("latestSongs")}}>Get Latest songs</button>
        <button onClick={()=>{setRenderedList("topSongs")}}>Get Top songs</button>
        <button onClick={()=>{setRenderedList("topArtists")}}>Get Top artists</button>
        <button onClick={()=>{setRenderedList("recommendations")}}>Get recommendations</button>
        <button onClick={()=>{setRenderedList("customRecommendation")}}>Get custom recommendations</button>
        <input type="number" min="1" max="50" onChange={handleChangeAmount} value={requestLimit}/>
        <LimitContext.Provider value={requestLimit}>
          {renderedList === "topSongs" ? <TopSongs changeSong={handleSongChange}/> : null}
          {renderedList === "latestSongs" ? <LatestSongs changeSong={handleSongChange}/> : null}
          {renderedList === "topArtists" ? <TopArtists  changeSong={handleSongChange}/> : null}
          {renderedList === "recommendations" ? <Recommendations userId={userId} changeSong={handleSongChange}/> : null}
          {renderedList === "customRecommendation" ? <CustomRecommendation userId={userId} changeSong={handleSongChange}/> : null}
        </LimitContext.Provider>
    </div>
    {playerDisplaying ? 
      <div className="player">
        <SpotifyPlayer
          token={userToken}
          play= {playerStatus}
          uris={[currentSong]}
          styles={{
            activeColor: '#fff',
            borderRadius: '5px',
            bgColor: 'rgb(50,50,50)',
            color: '#fff',
            loaderColor: '#fff',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
        />
      </div>
    : null}
    </>
  );
}
export default App;
