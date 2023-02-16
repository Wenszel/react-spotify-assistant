import { useState } from "react";

export default (apiCall: any, token: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async () => {
        setLoading(true);
        try {
            const result = await apiCall(token);
            setData(result.data);
        } catch (err) {
            let message = "Unknown error";
            if (err instanceof Error) {
                setError(err.message || "Unexpected Error!");
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        request,
    };
};
