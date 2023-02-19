import React from "react";
import { Button, Avatar } from "@mui/material";
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
                    <Link to="top-tracks">Top Tracks</Link>
                </Button>
                <Button variant="text">
                    <Link to="top-artists">Top Artists</Link>
                </Button>
                <Button variant="text">
                    <Link to="genres">Top Genres</Link>
                </Button>
                <Button variant="text">
                    <Link to="recent-songs">Recently played</Link>
                </Button>
                <Button variant="text">
                    <Link to="recommendations">Recommendations</Link>
                </Button>
                <Button variant="text">
                    <Link to="custom-recommendations">Create custom playlist</Link>
                </Button>
            </div>
            <div className={styles.profile}>
                <p>{username}</p>
                <Avatar src={userImage} alt="profile" />
            </div>
        </header>
    );
}
