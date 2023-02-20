import React, {useEffect, useState, useContext, createContext} from "react";
import axios from "axios";
import TopSongs from "./components/Lists/TopTracks/TopTracks";
import TopArtists from "./components/Lists/TopArtists/TopArtists";
import SpotifyPlayer from "react-spotify-web-playback";
import LatestSongs from "./components/Lists/RecentSongs/RecentSongs";
import Header from "./components/Header/Header";
import "./index.css";
import CustomRecommendation from "./components/CustomRecommendation";
import Recommendations from "./components/Recommendations";
import { TokenContext } from "./Login";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
export const currentSongContext = createContext("");
const App = () => {
    const [playerDisplaying, setPlayerDisplaying] = useState<boolean>(false);

    const [playerStatus, setPlayerStatus] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<string>("");

    const [userImage, setUserImage] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [userToken] = useState(useContext(TokenContext));

    useEffect(() => {
        axios("https://api.spotify.com/v1/me", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userToken,
            },
            method: "GET",
        }).then(listResponse => {
            setUsername(listResponse.data.display_name);
            setUserImage(listResponse.data.images[0].url);
            setUserId(listResponse.data.id);
        });
    }, [userToken]);

    const handleSongChange = (newSong: string) => {
        setCurrentSong(newSong);
        setPlayerDisplaying(true);
        setPlayerStatus(true);
    };

    return (
        <>
        <currentSongContext.Provider value={currentSong}>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header userImage={userImage} username={username} />
                                <div className="wrapper">
                                    <Outlet />
                                </div>
                            </>
                        }
                    >

                            <Route path="top-tracks" element={<TopSongs changeSong={handleSongChange} />} />
                            <Route path="recent-songs" element={<LatestSongs changeSong={handleSongChange} />} />
                            <Route path="top-artists" element={<TopArtists />} />
                            <Route path="recommendations" element={<Recommendations userId={userId} changeSong={handleSongChange} />} />
                            <Route path="custom-recommendations" element={<CustomRecommendation userId={userId} changeSong={handleSongChange} />} />

                    </Route>
                </Routes>
            </Router>
        </currentSongContext.Provider>
            {playerDisplaying ? (
                <div className="player">
                    <SpotifyPlayer
                        token={userToken}
                        play={playerStatus}
                        uris={[currentSong]}
                        styles={{
                            activeColor: "#fff",
                            bgColor: "rgb(50,50,50)",
                            color: "#fff",
                            loaderColor: "#fff",
                            trackArtistColor: "#ccc",
                            trackNameColor: "#fff",
                        }}
                    />
                </div>
            ) : null}
        </>
    );
};
export default App;
