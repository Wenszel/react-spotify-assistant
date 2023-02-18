import React, { useContext, useEffect } from "react";
import ListImage from "../../ListImage";
import useApi from "../../../hooks/useApi";
import listsApi from "../../../services/api/listsApi";
import { TokenContext } from "../../../Login";
import { CircularProgress, Grid } from "@mui/material";

export default ({ changeSong }) => {
    const token = useContext(TokenContext);
    const getRecentSongsApi = useApi(listsApi.getRecentSongs, token);

    const formatDate = (date: string) => {
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let hour = date.slice(11, 16);
        return day + "-" + month + "-" + year + " " + hour;
    };

    useEffect(() => {
        getRecentSongsApi.request();
    }, []);

    return (
        <>
            {!getRecentSongsApi.loading ? (
                getRecentSongsApi.data?.items.map((item, index: number) => (
                    <Grid container className="list-items" key={index}>
                        <Grid xs={3}>
                            <p>{formatDate(item.played_at)}</p>
                        </Grid>
                        <Grid xs={1}>
                            <ListImage image={item.track.album.images[2].url} uri={item.track.uri} changeSong={changeSong} />
                        </Grid>
                        <Grid xs={4}>
                            <p>{item.track.name}</p>
                        </Grid>
                        <Grid xs={4}>{item.track.artists.map(artist => artist.name).join(", ")}</Grid>
                    </Grid>
                ))
            ) : (
                <CircularProgress color="inherit" />
            )}
        </>
    );
};
