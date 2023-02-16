import client from "./apiClient";

const getTopArtists = token =>
    client.get("/me/top/artists?limit=50", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

const getTopSongs = token =>
    client.get("/me/top/tracks?time_range=long_term&limit=50", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

export default {
    getTopArtists,
    getTopSongs,
};
