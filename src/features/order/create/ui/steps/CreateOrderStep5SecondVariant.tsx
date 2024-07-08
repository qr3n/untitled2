'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {useState} from "react";
import {PlusIcon} from "lucide-react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Input {
    id: number;
    value: string;
}

export const CreateOrderStep5SecondVariant = () => {
    const [inputs2, setInputs2] = useState<Input[]>([{ id: Date.now(), value: '' }]);
    const [inputs, setInputs] = useState<Input[]>([{ id: Date.now(), value: '' }]);

    const addInput2 = () => {
        setInputs2([...inputs2, { id: Date.now(), value: '' }]);
    };

    const removeInput2 = (id: number) => {
        setInputs2(inputs2.filter(input => input.id !== id));
    };

    const handleInputChange2 = (id: number, value: string) => {
        setInputs2(inputs2.map(input => input.id === id ? { ...input, value } : input));
    };


    const addInput = () => {
        setInputs([...inputs, { id: Date.now(), value: '' }]);
    };

    const removeInput = (id: number) => {
        setInputs(inputs.filter(input => input.id !== id));
    };

    const handleInputChange = (id: number, value: string) => {
        setInputs(inputs.map(input => input.id === id ? { ...input, value } : input));
    };

    return (
        <CreateOrderStepTemplate title='Куда и откуда?' description='Условия для каждого варианта различаются'>
            <div
                className='flex flex-col mt-2 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>Куда доставить?</h1>
                <div className='w-full max-h-36 overflow-y-auto pr-4 mt-4 pb-4'>
                    {inputs.map(i => (
                        <div key={i.id} className='flex items-center mt-4 justify-between w-full gap-2'>
                            <input
                                value={i.value}
                                onChange={(e) => handleInputChange(i.id, e.target.value)}
                                className='w-full bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                placeholder='Введите адрес'/>

                            <div className='p-2 bg-[#222] rounded-md' onClick={() => { inputs.length > 1 && removeInput(i.id)  }} >
                                <FaRegTrashAlt style={{ color: inputs.length > 1 ? '#ccc' : '#8c8c8c' }}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    onClick={addInput}
                    className='w-full py-2 px-4 rounded-xl border border-[#4A4A4A] gap-2 hover:bg-[#111] cursor-pointer mt-2 flex items-center'>
                    <PlusIcon className='w-4'/> Локация
                </div>


                <h1 className='text-2xl font-semibold mt-12'>Откуда забрать?</h1>
                <div className='w-full max-h-36 overflow-y-auto pr-4 mt-4 pb-4'>
                    {inputs2.map(i => (
                        <div key={i.id} className='flex items-center mt-4 justify-between w-full gap-2'>
                            <input
                                value={i.value}
                                onChange={(e) => handleInputChange2(i.id, e.target.value)}
                                className='w-full bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                placeholder='Введите адрес'/>

                            <div className='p-2 bg-[#222] rounded-md' onClick={() => { inputs2.length > 1 && removeInput2(i.id)  }}>
                                <FaRegTrashAlt style={{ color: inputs2.length > 1 ? '#ccc' : '#8c8c8c' }}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    onClick={addInput2}
                    className='w-full py-2 px-4 rounded-xl border border-[#4A4A4A] gap-2 hover:bg-[#111] cursor-pointer mt-2 flex items-center'>
                    <PlusIcon className='w-4'/> Локация
                </div>

            </div>
        </CreateOrderStepTemplate>
    )
}
