import { createContext, useState } from "react";
import { Credentials } from "./Credentials";
import "./index.css";
import App from "./App";
import SpotifyLogin from "react-spotify-login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export const TokenContext = createContext("");

interface SuccessResponse {
    access_token: string;
}

const Login = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string>("");
    const onSuccess = (response: SuccessResponse) => {
        setUserToken(response.access_token);
        handleUnmount();
    };
    const onFailure = (response: any) => console.error(response);
    const spotify = Credentials();
    const handleUnmount = () => {
        setIsLogged(true);
    };
    return (
        <Router>
            {isLogged ? (
                <Redirect to="/logged" />
            ) : (
                <SpotifyLogin
                    className="login-button"
                    clientId={spotify.ClientId}
                    scope={
                        "user-read-recently-played streaming user-read-playback-state user-modify-playback-state user-top-read user-read-email playlist-modify-private user-modify-playback-state user-read-private"
                    }
                    onSuccess={onSuccess}
                    redirectUri={spotify.redirectUri}
                    onFailure={onFailure}
                />
            )}
            <Route path="/logged">
                <TokenContext.Provider value={userToken}>{isLogged ? <App /> : <Redirect to="/" />}</TokenContext.Provider>
            </Route>
        </Router>
    );
};
export default Login;
