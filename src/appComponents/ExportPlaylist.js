import React from 'react'
import axios from 'axios'
const ExportPlaylist = ({uris,userId,token})=>{
    const createPlaylist = (()=>{
        axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            name: "test",
            public: false
          },{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ token
              }
        })
    })
    return <button onClick={createPlaylist}>Export Playlist</button>
}
export default ExportPlaylist;