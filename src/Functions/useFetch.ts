import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './../components/Classes/Product'

const baseURL = 'http://localhost:3000/';

export const useFetch = (url) => {
    const [data, setData] = useState<Product[]>([]);
    const [fetchLoading, setFetchLoading] = useState<any>(true);
    const [fetchError, setFetchError] = useState<any>(undefined);
   
    useEffect(() => {
        const getData = async () => {
            setFetchError(undefined);
            setFetchLoading(true);

            try {
                const response = await axios.get(`${baseURL}${url}`);
                setData(response.data);
            } catch (error) {
                setFetchError(error)
            } finally {
                setFetchLoading(false);
            }
        };
   
        getData();
    }, [url]);

    return { data, fetchLoading, fetchError };
}