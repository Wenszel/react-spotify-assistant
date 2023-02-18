import client from "./apiClient";
const headers = (token: string) => {
    return {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    };
};
const getTopArtists = (token: string) => client.get("/me/top/artists?limit=50", headers(token));

const getTopSongs = (token: string) => client.get("/me/top/tracks?time_range=long_term&limit=50", headers(token));

const getRecentSongs = (token: string) => client.get("/me/player/recently-played?limit=50", headers(token));

export default {
    getTopArtists,
    getTopSongs,
    getRecentSongs,
};
