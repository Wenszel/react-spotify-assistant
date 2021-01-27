import React from 'react'
import axios from 'axios'
const ExportPlaylist = ({uris,userId,token})=>{
    const createPlaylist = (()=>{
        axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            name: "Playlist "+new Date(),
            public: false
          },{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ token
              }
        }).then(exportingResponse=>{
            addSongs(exportingResponse.data.id);
        })
    })
    const addSongs = (playlistId)=>{
        axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris.join(',')}`,{
          },{
            headers:{
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ token
              }
        })
    }
    return <button onClick={createPlaylist}>Export Playlist</button>
}
export default ExportPlaylist;