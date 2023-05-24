import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3000/';

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
   
    useEffect(() => {
        const getData = async () => {
            setError(undefined);
            setLoading(true);

            try {
                const response = await axios.get(`${baseURL}${url}`);
                setData(response.data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };
   
        getData();
    }, [url]);

    return { data, loading, error };
}