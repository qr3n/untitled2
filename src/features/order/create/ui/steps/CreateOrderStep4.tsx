'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import check from './assets/check.png'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Image from "next/image";
import {Context} from "@/features/order/create/model/context";

interface IProps {
    text: string,
    setter:  Dispatch<SetStateAction<string[]>>
}


const Variant = (props: IProps) => {
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (selected) {
            props.setter(prev => [...prev, props.text])
        }

        else {
            props.setter(prev => prev.filter(v => v != props.text))
        }
    }, [selected]);

    return (
        <div className='flex gap-5 cursor-pointer items-center' onClick={() => {
            setSelected(!selected)
        }}>
            {selected ? <Image src={check} alt={'check'} className='w-6 h-6'/> :
                <div className='border-2 rounded-md border-[#858585] w-6 h-6'/>}
            <h1 className='text-xl font-semibold'>{props.text }</h1>
        </div>
    )
}


export const CreateOrderStep4 = () => {
    const { setWhatToDeliver, whatToDeliver } = useContext(Context)
    
    useEffect(() => {
        console.log(whatToDeliver)
    }, [whatToDeliver])
    
    return (
        <CreateOrderStepTemplate title='Что доставить?' description='Не забудьте описать детали заказа в разделе "Пожелания"'>
            <div className='w-screen p-12 sm:w-full flex items-center justify-center'>
                <div className='flex flex-col gap-6 max-h-[calc(100dvh-400px)] overflow-y-auto w-full sm:px-32'>
                    <Variant text='Посылку' setter={setWhatToDeliver}/>
                    <Variant text='Документы' setter={setWhatToDeliver}/>
                    <Variant text='Личные вещи' setter={setWhatToDeliver}/>
                    <Variant text='Запчасти' setter={setWhatToDeliver}/>
                    <Variant text='Электронику' setter={setWhatToDeliver}/>
                    <Variant text='Бытовую технику' setter={setWhatToDeliver}/>
                    <Variant text='Товары из магазина' setter={setWhatToDeliver}/>
                    <Variant text='Одежду' setter={setWhatToDeliver}/>
                    <Variant text='Лекарства' setter={setWhatToDeliver}/>
                    <Variant text='Мебель' setter={setWhatToDeliver}/>
                    <Variant text='Стройматериалы' setter={setWhatToDeliver}/>
                    <Variant text='Цветы/Букеты' setter={setWhatToDeliver}/>
                    <Variant text='Шары' setter={setWhatToDeliver}/>
                    <Variant text='Продукты' setter={setWhatToDeliver}/>
                    <Variant text='Еду из ресторана' setter={setWhatToDeliver}/>
                    <Variant text='Ценную вещь' setter={setWhatToDeliver}/>
                </div>
            </div>
        </CreateOrderStepTemplate>
    )
}