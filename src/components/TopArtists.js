import React, { useContext, useEffect, useState } from "react";
import DownloadList from "./DownloadList";
import axios from "axios";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { TokenContext } from "../Login";

const Chart = ({ genres }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const createDataObject = () => {
            let labels = [];
            let datasets = [
                {
                    data: [],
                },
            ];
            genres.forEach(item => {
                if (!labels.includes(item)) {
                    labels.push(item);
                    datasets[0].data.push(1);
                } else {
                    datasets[0].data[labels.indexOf(item)]++;
                }
            });
            datasets[0].data = datasets[0].data.filter((item, index) => {
                if (item === 1) {
                    return labels.splice(index, 1);
                } else if (item > 1) {
                    return item;
                }
                return null;
            });
            return { labels: labels, datasets: datasets };
        };
        setData(createDataObject());
    }, [genres]);
    return (
        <div className="chart">
            <Pie data={data}></Pie>
        </div>
    );
};
Chart.propTypes = {
    genres: PropTypes.array,
};
const TopArtists = () => {
    const token = useContext(TokenContext);
    const [topArtistsList, setTopArtistsList] = useState([]);
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        axios(`https://api.spotify.com/v1/me/top/artists?limit=50`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            method: "GET",
        }).then(listResponse => {
            setTopArtistsList(listResponse.data.items);
            let genres = [];
            listResponse.data.items.forEach(item => {
                genres.push(item.genres);
            });
            setGenres(genres.flat());
        });
    }, [token]);
    return (
        <div className="list-table">
            {topArtistsList.map((item, index) => (
                <div key={topArtistsList.indexOf(item)} className="list">
                    {index === 0 ? <img src={item.images[0].url} alt="track" className="first-image" /> : null}
                    {[1, 2].includes(index) ? <img src={item.images[0].url} className="podium-image" alt="track" /> : null}
                    {index > 2 ? <img src={item.images[0].url} className="other-image" alt="track" /> : null}
                    <p>{item.name}</p>
                </div>
            ))}
            <DownloadList list={topArtistsList} name="TopArtistsList" />
            <Chart genres={genres} />
        </div>
    );
};
export default TopArtists;
