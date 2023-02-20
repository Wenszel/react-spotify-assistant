import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DownloadList from "./DownloadList";
import ExportPlaylist from "./ExportPlaylist";
import PropTypes from "prop-types";
import ListImage from "./SongCover/SongCover";
import { TokenContext } from "../Login";
import {CircularProgress, Grid} from "@mui/material";

const Recommendations = ({ userId, changeSong }) => {
    const token = useContext(TokenContext);
    const [recommendations, setRecommendations] = useState([]);
    useEffect(() => {
        let recommends = "";
        axios(`https://api.spotify.com/v1/me/top/artists?limit=5`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            method: "GET",
        }).then(listResponse => {
            let { items } = listResponse.data;
            for (let i = 0; i < 5; i++) {
                if (!recommends.includes(items[i].id)) recommends += items[i].id + ",";
            }
            recommends = recommends.slice(0, -1);
            axios(`https://api.spotify.com/v1/recommendations?limit=50&seed_artists=${recommends}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                method: "GET",
            }).then(listResponse => {
                console.log(listResponse);
                setRecommendations(listResponse.data.tracks);
            });
        });
    }, [token]);

    return (
        <div className="list-table">
            {recommendations ?
            <>
                {recommendations.map((item, index) => (
                    <Grid container spacing={1} className="list-items" key={index}>
                        <Grid item xs={1}>
                            <ListImage image={item.album.images[2].url} uri={item.uri} changeSong={changeSong} />
                        </Grid>
                        <Grid item xs={6}>
                            <p>{item.name}</p>
                        </Grid>
                        <Grid item xs={5}>
                            <p>{item.artists.map(artist => artist.name).join(", ")}</p>
                        </Grid>
                    </Grid>
                ))}
                <DownloadList list={recommendations} name="recommendations" />
                <ExportPlaylist userId={userId} token={token} uris={getUries(recommendations)} />
            </>
            : (
            <CircularProgress color="inherit" />
            )}
        </div>
    );
};
const getUries = recommendations => {
    let uries = [];
    recommendations.forEach(item => {
        uries.push(item.uri);
    });
    return uries;
};
Recommendations.propTypes = {
    userId: PropTypes.string,
};
export default Recommendations;
