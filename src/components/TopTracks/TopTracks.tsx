import React, { useContext, useEffect, useState } from "react";
import DownloadList from "../DownloadList";
import ListImage from "../ListImage";
import { TokenContext } from "../../Login";
import axios from "axios";

interface functions {
    changeSong: (newSong: string) => void;
}

interface listOfSongs {
    album: { images: { url: string }[] };
    uri: string;
    name: string;
    artists: {
        name: string;
    }[];
}

const TopSongs = ({ changeSong }: functions) => {
    const token = useContext(TokenContext);
    const [topSongsList, setTopSongsList] = useState<listOfSongs[]>([]);

    useEffect(() => {
        axios(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            method: "GET",
        }).then(listResponse => {
            setTopSongsList(listResponse.data.items);
        });
    }, [token]);

    return (
        <div className="list-table">
            {topSongsList.map((item, index) => (
                <div key={topSongsList.indexOf(item)} className="list-item">
                    <p>{index + 1}</p>
                    <ListImage image={item.album.images[2].url} uri={item.uri} changeSong={changeSong} />
                    <p style={{ fontWeight: "bold" }}>{item.name}</p>
                    <p>{item.artists.map(i => i.name + "   ")}</p>
                </div>
            ))}
            <DownloadList name="TopSongsList" list={topSongsList} />
        </div>
    );
};
export default TopSongs;
