'use client';

import axios from "axios";

export const Orders = () => {
    const orders = axios.get('https://emarket-1ans.onrender.com/orders', {
        withCredentials: true
    })


    return (
        <>

        </>
    )
}