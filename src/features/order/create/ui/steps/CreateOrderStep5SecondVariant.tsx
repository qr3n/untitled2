'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Script from "next/script";
import {Map, YMaps} from "@pbe/react-yandex-maps";
import {useState} from "react";
import {PlusIcon} from "lucide-react";

export const CreateOrderStep5SecondVariant = () => {
    const [to, setTo] = useState(1)
    const [from, setFom] = useState(1)

    return (
        <CreateOrderStepTemplate title='Куда и откуда?' description='Условия для каждого варианта различаются'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>Куда доставить?</h1>
                <div className='w-full max-h-36 overflow-y-auto mt-4 pr-4'>
                    {Array.from({length: to}).map((item, i) => (
                        <input
                            key={i}
                            className='w-full bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                            placeholder='Введите адрес'/>
                    ))}
                </div>
                <div
                    onClick={() => setTo(prev => prev += 1)}
                    className='w-full py-2 px-4 rounded-xl border border-[#4A4A4A] gap-2 hover:bg-[#111] cursor-pointer mt-2 flex items-center'>
                    <PlusIcon className='w-4'/> Локация
                </div>


                <h1 className='text-2xl font-semibold mt-12'>Откуда забрать?</h1>
                <div className='w-full max-h-36 overflow-y-auto mt-4 pr-4'>
                    {Array.from({length: from}).map((item, i) => (
                        <input
                            key={i}
                            className='w-full bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                            placeholder='Введите адрес'/>
                    ))}
                </div>
                <div
                    onClick={() => setFom(prev => prev += 1)}
                    className='w-full py-2 px-4 rounded-xl border border-[#4A4A4A] gap-2 hover:bg-[#111] cursor-pointer mt-2 flex items-center'>
                    <PlusIcon className='w-4'/> Локация
                </div>

            </div>
        </CreateOrderStepTemplate>
    )
}
