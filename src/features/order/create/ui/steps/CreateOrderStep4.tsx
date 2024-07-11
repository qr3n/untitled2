'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import check from './assets/check.png'
import {Dispatch, SetStateAction, useContext, useState} from "react";
import Image from "next/image";
import {Context} from "@/features/order/create/model/context";

interface IProps {
    text: string,
    setter:  Dispatch<SetStateAction<string[]>>
}


const Variant = (props: IProps) => {
    const [selected, setSelected] = useState(false)

    return (
        <div className='flex gap-5 cursor-pointer items-center' onClick={() => {
            setSelected(!selected)

            if (selected) {
                props.setter(prev => [...prev, props.text])
            }

            else {
                props.setter(prev => prev.filter(v => v != props.text))
            }
        }}>
            {selected ? <Image src={check} alt={'check'} className='w-6 h-6'/> :
                <div className='border-2 rounded-md border-[#858585] w-6 h-6'/>}
            <h1 className='text-xl font-semibold'>{props.text }</h1>
        </div>
    )
}


export const CreateOrderStep4 = () => {
    const { setWhatToDeliver } = useContext(Context)

    return (
        <CreateOrderStepTemplate title='Что доставить?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col gap-6'>
                <Variant text='Посылка' setter={setWhatToDeliver}/>
                <Variant text='Документы' setter={setWhatToDeliver}/>
                <Variant text='Личные вещи' setter={setWhatToDeliver}/>
                <Variant text='Продукты' setter={setWhatToDeliver}/>
                <Variant text='Лекарства' setter={setWhatToDeliver}/>
                <Variant text='Цветы' setter={setWhatToDeliver}/>
                <Variant text='Другое' setter={setWhatToDeliver}/>
            </div>
        </CreateOrderStepTemplate>
    )
}