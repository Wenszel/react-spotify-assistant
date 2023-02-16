import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export default apiClient;
