'use client';

import axios from "axios";
import {useEffect, useState} from "react";
import {useCookies} from "next-client-cookies";

interface IOrder {
    name: string
}

export const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const cookies = useCookies()
    const token = cookies.get('token')

    useEffect(() => {
        axios.get(`https://emarket-1ans.onrender.com/orders?token=${token}`, {
            withCredentials: true
        }).then(order => {
            setOrders(order.data);
        })
    }, [token]);

    return (
        <div className='px-8 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
            {
                orders.map((order, index) => (
                    <div key={index} className='p-4 bg-[#222] mt-4 rounded-xl w-full font-semibold'>{order.name}</div>
                ))
            }
        </div>
    )
}