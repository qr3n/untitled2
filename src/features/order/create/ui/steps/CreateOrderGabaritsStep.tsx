
'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Context} from "@/features/order/create/model/context";
import {useContext} from "react";


type LENGTH = 0
type WIDTH = 1
type HEIGHT = 2


export const CreateOrderGabaritsStep = () => {
    const { dimensions, setDimensions, setCount, count } = useContext(Context);

    const handleChange = (param: LENGTH | WIDTH | HEIGHT, val: string) => {
        const newDimensions = dimensions

        newDimensions[param] = val

        setDimensions(newDimensions)
    }

    return (
        <CreateOrderStepTemplate title='Какие габариты?' description='Пожалуйста, укажите общие габариты груза'>
            <div
                className='flex flex-col mt-2 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%] h-[calc(100dvh-350px)] overflow-y-auto'>

                <h1 className='text-xl font-semibold'>Длина</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='200см' onChange={e => handleChange(0, e.target.value)}/>

                <h1 className='text-xl font-semibold mt-6'>Ширина</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='200см' onChange={e => handleChange(1, e.target.value)}/>


                <h1 className='text-xl font-semibold mt-6'>Высота</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='120см' onChange={e => handleChange(2, e.target.value)}/>


                <h1 className='text-2xl font-semibold mt-6'>Кол.мест</h1>
                <Select defaultValue={'1'} onValueChange={v => setCount(v)} value={count}>
                    <SelectTrigger className="w-full mt-4">
                        <SelectValue placeholder="Выберите количество"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Array.from({length: 99}).map((item, i) => (
                                <SelectItem value={i.toString()} key={i}>{i + 1}</SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectItem value={'100'}>100 и более</SelectItem>
                    </SelectContent>
                </Select>

                <h1 className='text-xl font-semibold mt-6'>Общий вес</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='5кг' onChange={e => handleChange(2, e.target.value)}/>

            </div>
        </CreateOrderStepTemplate>
    )
}
