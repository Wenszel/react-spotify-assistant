import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DownloadList from "./DownloadList";
import ExportPlaylist from "./ExportPlaylist";
import PropTypes from "prop-types";
import ListImage from "./SongCover/SongCover";
import { TokenContext } from "../Login";

const CustomRecommendation = ({ userId, changeSong }) => {
    const token = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [inputState, setInputState] = useState({
        target_acousticness: 0.5,
        target_danceability: 0.5,
        target_energy: 0.5,
        target_instrumentalness: 0.5,
        target_liveness: 0.5,
        target_loudness: 0.5,
        target_speechiness: 0.5,
        target_valence: 0.5,
    });
    const properties = [
        "target_acousticness",
        "target_danceability",
        "target_energy",
        "target_instrumentalness",
        "target_liveness",
        "target_loudness",
        "target_speechiness",
        "target_valence",
    ];
    const [selectedGenre, setSelectedGenre] = useState("country");
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        axios(`https:api.spotify.com/v1/recommendations/available-genre-seeds`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            method: "GET",
        }).then(listResponse => {
            setGenres(listResponse.data.genres);
        });
    }, [token, data]);
    const formatInputValuesToQueryParameters = () => {
        let query = "";
        for (const [key, value] of Object.entries(inputState)) {
            query += `&${key}=${value}`;
        }
        return query;
    };
    const handleSubmit = event => {
        event.preventDefault();
        axios(`https:api.spotify.com/v1/recommendations?limit=50&seed_genres=${selectedGenre}${formatInputValuesToQueryParameters()}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            method: "GET",
        }).then(listResponse => {
            console.log(listResponse.data);
            setData(listResponse.data.tracks);
        });
    };
    const handleInputChange = event => {
        setInputState(currentState => ({
            ...currentState,
            [event.target.name]: event.target.value,
        }));
    };
    const handleSelectChange = event => {
        setSelectedGenre(currentState => (currentState = event.target.value));
    };
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="choose genre" list="genres" />
            <datalist id="genres" value={selectedGenre} onChange={handleSelectChange}>
                {genres.map(genre => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
                ;
            </datalist>
            {properties.map(prop => (
                <div key={prop}>
                    <label>{prop}</label>
                    <input name={prop} value={inputState.prop} onChange={handleInputChange} type="range" min="0" max="1" step="0.01" />
                </div>
            ))}
            <button>Submit</button>
            <div className="list-table">
                {data.map((item, index) => (
                    <div key={data.indexOf(item)} className="list">
                        <ListImage image={item.album.images[2].url} uri={item.uri} changeSong={changeSong} />
                        <p>{item.name}</p>
                    </div>
                ))}
                <DownloadList name="RecommendationList" list={data} />
                <ExportPlaylist userId={userId} token={token} uris={getUries(data)} />
            </div>
        </form>
    );
};
const getUries = recommendations => {
    let uries = [];
    recommendations.forEach(item => {
        uries.push(item.uri);
    });
    return uries;
};
CustomRecommendation.propTypes = {
    userId: PropTypes.string,
};
export default CustomRecommendation;
