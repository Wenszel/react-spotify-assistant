import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import TopSongs from "./components/TopSongs";
import TopArtists from "./components/TopArtists";
import SpotifyPlayer from "react-spotify-web-playback";
import LatestSongs from "./components/LastestSongs";
import "./index.css";
import Header from "./components/Header/Header";
import CustomRecommendation from "./components/CustomRecommendation";
import Recommendations from "./components/Recommendations";
import { TokenContext } from "./Login";

export const LimitContext = createContext<number>(1);

const App = () => {
    const [renderedList, setRenderedList] = useState<string>("");
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

    const handleChangeAmount = (event: React.ChangeEvent) => {
        let input = event.target as HTMLInputElement;
        const value: number = parseInt(input.value);
        if (value < 0) setRequestLimit(1);
        else if (value > 50) setRequestLimit(50);
        else setRequestLimit(value);
    };

    const handleSongChange = (newSong: string) => {
        setCurrentSong(newSong);
        setPlayerDisplaying(true);
        setPlayerStatus(true);
    };

    return (
        <>
            <div className="wrapper">
                <div className="user-welcome">
                    <img className="user-image" src={userImage} alt="Profile" />
                    <h1>Hello {username}</h1>
                </div>
                <button
                    onClick={() => {
                        setRenderedList("latestSongs");
                    }}
                >
                    Get Latest songs
                </button>
                <button
                    onClick={() => {
                        setRenderedList("topSongs");
                    }}
                >
                    Get Top songs
                </button>
                <button
                    onClick={() => {
                        setRenderedList("topArtists");
                    }}
                >
                    Get Top artists
                </button>
                <button
                    onClick={() => {
                        setRenderedList("recommendations");
                    }}
                >
                    Get recommendations
                </button>
                <button
                    onClick={() => {
                        setRenderedList("customRecommendation");
                    }}
                >
                    Get custom recommendations
                </button>
                <input type="number" min="1" max="50" onChange={handleChangeAmount} value={requestLimit} />
                <LimitContext.Provider value={requestLimit}>
                    {renderedList === "topSongs" ? <TopSongs changeSong={handleSongChange} /> : null}
                    {renderedList === "latestSongs" ? <LatestSongs changeSong={handleSongChange} /> : null}
                    {renderedList === "topArtists" ? <TopArtists /> : null}
                    {renderedList === "recommendations" ? <Recommendations userId={userId} changeSong={handleSongChange} /> : null}
                    {renderedList === "customRecommendation" ? <CustomRecommendation userId={userId} changeSong={handleSongChange} /> : null}
                </LimitContext.Provider>
            </div>
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
