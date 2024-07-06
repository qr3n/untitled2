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

export const CreateOrderStep5SecondVariant = () => {
    return (
        <CreateOrderStepTemplate title='Куда и откуда?' description='Условия для каждого варианта различаются'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>Куда доставить?</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Площадь Восстания 12...'/>


                <h1 className='text-2xl font-semibold mt-12'>Откуда забрать?</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Московская 12...'/>
            </div>
        </CreateOrderStepTemplate>
    )
}
