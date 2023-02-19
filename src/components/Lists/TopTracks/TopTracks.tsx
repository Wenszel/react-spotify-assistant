import React, { useContext, useEffect } from "react";
import ListImage from "../../ListImage";
import { TokenContext } from "../../../Login";
import useApi from "../../../hooks/useApi";
import listsApi from "../../../services/api/listsApi";
import { Grid, CircularProgress } from "@mui/material";
import artist from "../interfaces/artists";
import song from "../interfaces/song";

const TopSongs = ({ changeSong }: { changeSong: (newSong: string) => void }) => {
    const token = useContext(TokenContext);
    const getTopSongsApi = useApi(listsApi.getTopSongs, token);
    useEffect(() => {
        getTopSongsApi.request();
    }, []);

    const artistsNamesWithCommas = (artists: Array<artist>) => {
        return artists.map(artist => artist.name).join(", ");
    };

    return (
        <>
            {!getTopSongsApi.loading ? (
                <>
                    <h1>Top tracks</h1>
                    <div className="list-table">
                        {getTopSongsApi.data?.items.map((song: song, index) => (
                            <Grid container spacing={1} className="list-items" key={index}>
                                <Grid xs={1} item={true}>
                                    <p>{index + 1}</p>
                                </Grid>
                                <Grid xs={1} item={true}>
                                    <ListImage image={song.album.images[2].url} uri={song.uri} changeSong={changeSong} />
                                </Grid>
                                <Grid xs={5} item={true}>
                                    <p style={{ fontWeight: "bold" }}>{song.name}</p>
                                </Grid>
                                <Grid xs={5} item={true}>
                                    {artistsNamesWithCommas(song.artists)}
                                </Grid>
                            </Grid>
                        ))}
                    </div>
                </>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </>
    );
};
export default TopSongs;
