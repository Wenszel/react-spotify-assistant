import React, { createContext, useState } from "react";
import "./index.css";
import App from "./App";
import SpotifyLogin from "react-spotify-login";

export const TokenContext = createContext("");

interface SuccessResponse {
    access_token: string;
}

const Login = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string>("");

    const onSuccess = (response: SuccessResponse) => {
        setUserToken(response.access_token);
        console.log(response.access_token);
        setIsLogged(true);
    };
    const onFailure = (response: any) => console.error(response);
    return (
        <>
            {isLogged ? (
                <TokenContext.Provider value={userToken}>
                    <App />
                </TokenContext.Provider>
            ) : (
                <SpotifyLogin
                    className="login-button"
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    scope={
                        "user-read-recently-played streaming user-read-playback-state user-modify-playback-state user-top-read user-read-email playlist-modify-private user-modify-playback-state user-read-private"
                    }
                    onSuccess={onSuccess}
                    redirectUri={process.env.REACT_APP_REDIRECT_URI}
                    onFailure={onFailure}
                />
            )}
        </>
    );
};
export default Login;
