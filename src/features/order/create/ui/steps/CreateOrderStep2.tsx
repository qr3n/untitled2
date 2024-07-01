'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import box from './assets/box.png'
import palette from './assets/palette.png'
import Image from "next/image";
import {useState} from "react";


export const CreateOrderStep2 = () => {
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
        <CreateOrderStepTemplate title='Какая упаковка?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col sm:flex-row text-center'>
                <div className='flex items-center justify-center flex-col cursor-pointer min-h-full p-4 transition-all'
                     style={selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => setSelected(0)
                }>
                    <Image src={box} alt={'courier'} className='w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64' height={600} width={600}/>
                    <h1 className='text-2xl font-semibold'>Для маркетплейса</h1>
                    <p className='text-lg text-[#9D9D9D]'>До 12кг</p>
                </div>
                <div className='flex items-center justify-center flex-col cursor-pointer min-h-full p-4 transition-all'
                     style={!selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => setSelected(1)}
                >
                    <Image src={palette} alt={'courier'} className='w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64' height={600} width={600}/>
                    <h1 className='text-2xl font-semibold'>Разный товар</h1>
                    <p className='text-lg text-[#9D9D9D]'>До 12кг</p>
                </div>
            </div>
        </CreateOrderStepTemplate>
    )
}