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

export const CreateOrderStep5 = () => {

    return (
        <CreateOrderStepTemplate title='Куда и откуда?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col mt-4 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>На какой склад?</h1>
                <Select>
                    <SelectTrigger className="w-full mt-4">
                        <SelectValue placeholder="Выберите склад" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Склады Москвы</SelectLabel>
                            <SelectItem value="apple">Вариант 1</SelectItem>
                            <SelectItem value="banana">Вариант 2</SelectItem>
                            <SelectItem value="blueberry">Вариант 3</SelectItem>
                            <SelectItem value="grapes">Вариант 4</SelectItem>
                            <SelectItem value="pineapple">Вариант 5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <h1 className='text-2xl font-semibold mt-8'>Откуда забрать?</h1>
                <input className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]' placeholder='Московская 12...'/>

                <div className='w-full overflow-hidden rounded-xl mt-8'>
                    <YMaps>
                        <div className=''>
                            <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width={1000} height={160}/>
                        </div>
                    </YMaps>
                </div>
            </div>
        </CreateOrderStepTemplate>
    )
}
