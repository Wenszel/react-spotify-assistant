import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { TokenContext } from "../../../Login";
import useApi from "../../../hooks/useApi";
import listsApi from "../../../services/api/listsApi";
import artist from "../interfaces/artists";

const Chart = ({ genres }: { genres: Array<string> }) => {
    const [data, setData] = useState({});
    useEffect(() => {
        const createDataObject = () => {
            let labels: Array<string> = [];
            let datasets = [
                {
                    data: new Array<number>(),
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
    const getTopArtistsApi = useApi(listsApi.getTopArtists, token);
    useEffect(() => {
        getTopArtistsApi.request();
    }, []);
    return (
        <div className="list-table">
            {getTopArtistsApi.data?.items.map((item: artist, index: number) => (
                <div key={index} className="list">
                    {index === 0 ? <img src={item.images[0].url} alt="track" className="first-image" /> : null}
                    {[1, 2].includes(index) ? <img src={item.images[0].url} className="podium-image" alt="track" /> : null}
                    {index > 2 ? <img src={item.images[0].url} className="other-image" alt="track" /> : null}
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};
export default TopArtists;
