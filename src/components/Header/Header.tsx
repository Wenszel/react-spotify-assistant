import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface userData {
    userImage: string;
    username: string;
}

export default function Header({ userImage, username }: userData) {
    return (
        <header className={styles.header}>
            <div>
                <Button variant="text">
                    <Link to="top-songs">Songs</Link>
                </Button>
                <Button variant="text">
                    <Link to="top-artists">Artists</Link>
                </Button>
                <Button variant="text">
                    <Link to="recent-songs">Recent played</Link>
                </Button>
                <Button variant="text">
                    <Link to="genres">Genres</Link>
                </Button>
                <Button variant="text">
                    <Link to="recommendations">Recommendations</Link>
                </Button>
                <Button variant="text">
                    <Link to="custom-recommendations">Create custom playlist</Link>
                </Button>
            </div>
            <div className={styles.profile}>
                <h1>{username}</h1>
                <img className={styles.image} src={userImage} alt="user photo" />
            </div>
        </header>
    );
}
