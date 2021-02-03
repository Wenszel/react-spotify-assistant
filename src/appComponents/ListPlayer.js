import axios from 'axios';
import React from 'react';
const ListPlayer = ({token}) =>{
    const handleMusicPlay = ()=>{
        axios.put('https://api.spotify.com/v1/me/player/pause',{
            },{
              headers:{
                "Accept": "application/json", 
                "Content-Type": "application/json",
                'Authorization' : 'Bearer '+ token
                }
        })
    };
    return (
        <>
            <button onClick={handleMusicPlay}>trololo</button>
        </>
    )
}
export default ListPlayer;