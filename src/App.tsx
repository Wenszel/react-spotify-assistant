import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import TopSongs from "./components/TopSongs";
import TopArtists from "./components/TopArtists";
import SpotifyPlayer from "react-spotify-web-playback";
import LatestSongs from "./components/LastestSongs";
import Header from "./components/Header/Header";
import "./index.css";
import CustomRecommendation from "./components/CustomRecommendation";
import Recommendations from "./components/Recommendations";
import { TokenContext } from "./Login";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

export const LimitContext = createContext<number>(20);

const App = () => {
    const [requestLimit, setRequestLimit] = useState<number>(20);
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
            <LimitContext.Provider value={requestLimit}>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Header userImage={userImage} username={username} />
                                    <Outlet />
                                </>
                            }
                        >
                            <Route path="top-songs" element={<TopSongs changeSong={handleSongChange} />} />
                            <Route path="recent-songs" element={<LatestSongs changeSong={handleSongChange} />} />
                            <Route path="top-artists" element={<TopArtists />} />
                            <Route path="recommendations" element={<Recommendations userId={userId} changeSong={handleSongChange} />} />
                            <Route path="custom-recommendations" element={<CustomRecommendation userId={userId} changeSong={handleSongChange} />} />
                        </Route>
                    </Routes>
                </Router>
            </LimitContext.Provider>
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
