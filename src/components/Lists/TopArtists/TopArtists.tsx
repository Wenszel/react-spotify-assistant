import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { TokenContext } from "../../../Login";
import { Grid, CircularProgress } from "@mui/material";
import useApi from "../../../hooks/useApi";
import listsApi from "../../../services/api/listsApi";

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

    const generateList = () => {
        const list = [];
        for (let i = 0; i < getTopArtistsApi.data?.items.length; i += 3) {
            list.push(
                <Grid container spacing={1} className="list-items" key={i} columnSpacing={{ xs: 1 }}>
                    {generateRow(i)}
                </Grid>
            );
        }
        return list;
    };

    const generateRow = (index: number) => {
        const row = [];
        for (let i = 0; i < 3; i++) {
            row.push(generateArtistTile(index + i));
        }
        return row;
    };

    const generateArtistTile = (index: number) => {
        const item = getTopArtistsApi.data?.items[index];
        if (item == null) return;
        return (
            <Grid xs={4} direction="column">
                <img src={item.images[0].url} alt="track" style={{ height: "200px", width: "200px" }} className="artist-image" />
                <p>
                    {index + 1}. {item.name}
                </p>
            </Grid>
        );
    };

    return !getTopArtistsApi.loading ? (
        <>
            <h1>Top Artists</h1>
            <div className="list-table">{generateList()}</div>
        </>
    ) : (
        <CircularProgress color="inherit" />
    );
};
export default TopArtists;
