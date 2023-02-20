import React, {useContext, useEffect, useState} from 'react';
import PlaybackAnimation from "./PlaybackAnimation/PlaybackAnimation";
import {currentSongContext} from "../../App";

const SongCover = ({ uri, image, changeSong }) =>{
    const currentSong = useContext(currentSongContext)
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false)
    useEffect(()=>{
        setIsCurrentlyPlaying(currentSong === uri)
    },[uri, currentSong])
    return (
        <div className="list-image-container" onClick={()=>{changeSong(uri)}}>
            <img src={image} alt="track cover"  className="list-image"/>
            <div className="list-image-overlay">PLAY</div>
            { isCurrentlyPlaying ? <PlaybackAnimation /> : null }
        </div>
    )
}
export default SongCover;