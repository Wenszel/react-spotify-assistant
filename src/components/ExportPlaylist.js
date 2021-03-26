import React, { useContext }from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { TokenContext } from '../Login';
const ExportPlaylist = ({ uris, userId })=>{
    const token = useContext(TokenContext);
    const createPlaylist = (()=>{
        axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            name: "Playlist "+new Date().toString().slice(0,24),
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
        }).then(alert("Playlist exported"));
    }
    return <button className="download-button" onClick={createPlaylist}>Export Playlist</button>
}
ExportPlaylist.propTypes = {
  uris: PropTypes.array,
  userId: PropTypes.string
}
export default ExportPlaylist;