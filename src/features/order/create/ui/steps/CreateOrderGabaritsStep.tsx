
'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";



export const CreateOrderGabaritsStep = () => {

    return (
        <CreateOrderStepTemplate title='Какие габариты?' description='Пожалуйста, укажите точные значения'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>

                <h1 className='text-2xl font-semibold'>Длина</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='200см'/>


                <h1 className='text-2xl font-semibold mt-6'>Ширина</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='200см'/>


                <h1 className='text-2xl font-semibold mt-6'>Высота</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='120см'/>


                <h1 className='text-2xl font-semibold mt-6'>Количество</h1>
                <Select>
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
            </div>
        </CreateOrderStepTemplate>
    )
}