'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {useContext, useEffect, useState} from "react";
import {Context} from "@/features/order/create/model/context";
import axios from "axios";
import dollars from './assets/dollars.png'
import Image from "next/image";

export const CreateOrderCostOrderStep = () => {
    const [km, setKm] = useState(0)
    const { addrFrom, addrTo } = useContext(Context)

    useEffect(() => {
        if (addrFrom.length > 0 && addrTo.length > 0) {
            axios.post(`https://postavan.com/api/cost`, {
                address_from: addrFrom,
                address_to: addrTo,
            }).then(r => setKm(r.data))
        }
    }, [addrTo, addrFrom]);

    return (
        <CreateOrderStepTemplate title='Стоимость' description='Зависит от расстояния и количества мест'>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <Image className='w-48 h-48 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover'
                       src={dollars} alt={'select'} height={300} width={300}/>
                <h1 className='text-3xl font-semibold'>{Math.round(km / 1000 * 300)} руб</h1>
                <h1 className='text-xl text-[#999]'>~{(km / 1000).toFixed(1).toString().replace('.', ',')} км</h1>
            </div>
        </CreateOrderStepTemplate>
    )
}