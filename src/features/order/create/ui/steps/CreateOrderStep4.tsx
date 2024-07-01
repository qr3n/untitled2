'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import courier from './assets/courier.png'
import courierWithCar from './assets/courierwithcar.png'
import Image from "next/image";
import {useState} from "react";


export const CreateOrderStep1 = () => {
    const [selected, setSelected] = useState<number>(0);
    const selectedFirst = selected === 0

    const notSelectedStyle = {
        backgroundColor: 'transparent',
        border: '2px solid transparent',
        borderRadius: '24px'
    }

    const selectedStyle = {
        backgroundColor: 'rgba(184, 255, 166, .1)',
        border: '2px solid rgba(0, 255, 71, 0.5)',
        borderRadius: '24px'
    }

    return (
        <CreateOrderStepTemplate title='Какой груз?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col sm:flex-row text-center'>
                <div className='cursor-pointer min-h-full p-4 transition-all'
                     style={selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => setSelected(0)
                }>
                    <Image src={courierWithCar} alt={'courier'} height={300} width={300}/>
                    <h1 className='text-2xl font-semibold'>Для маркетплейса</h1>
                    <p className='text-lg text-[#9D9D9D]'>До 12кг</p>
                </div>
                <div className='cursor-pointer min-h-full p-4 transition-all'
                     style={!selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => setSelected(1)}
                >
                    <Image src={courier} alt={'courier'} height={300} width={300}/>
                    <h1 className='text-2xl font-semibold'>Разный товар</h1>
                    <p className='text-lg text-[#9D9D9D]'>До 12кг</p>
                </div>
            </div>
        </CreateOrderStepTemplate>
    )
}