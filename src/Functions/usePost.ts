import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './../components/Classes/Product'

const baseURL = 'http://localhost:3000/';

export const usePost = (url: string, product: Product) => {
    const [success, setSuccess] = useState<any>(false);
    const [postLoading, setPostLoading] = useState<any>(false);
    const [postError, setPostError] = useState<any>('');
   
    const postData = async () => {
        setPostError(undefined);
        setPostLoading(true);

        try {
            const dbData = await axios.get(`${baseURL}${url}`);
            const id = dbData.data.length + 1;

            const response = await axios.post(`${baseURL}${url}`, {
                userId: 1,
                id: product['id'],
                title: product['title'],
                price: product['price'],
                description: product['description'],
                category: product['category'],
                image: product['image'],
                rating: [product['rating']['rate'], product['rating']['count']],
            });

            setSuccess(true);
        } catch (error) {
            setPostError(error.response.data)
        } finally {
            setPostLoading(false);
        }
    }

    useEffect(() => {
        setSuccess(false);
        setPostLoading(false);
        setPostError('');
    }, [url, product]);

    return { success, postLoading, postError, postData };
}