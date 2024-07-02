'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import check from './assets/check.png'

interface IProps {
    text: string
}


const Variant = (props: IProps) => {
    return (
        <div className='flex gap-5 cursor-pointer'>
            <div className='border-2 rounded-md border-[#858585] p-3'/>
            <h1 className='text-xl font-semibold'>{ props.text }</h1>
        </div>
    )
}


export const CreateOrderStep4 = () => {

    return (
        <CreateOrderStepTemplate title='Что доставить?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col gap-6'>
                <Variant text='Посылка'/>
                <Variant text='Документы'/>
                <Variant text='Личные вещи'/>
                <Variant text='Продукты'/>
                <Variant text='Лекарства'/>
                <Variant text='Цветы'/>
                <Variant text='Другое'/>
            </div>
        </CreateOrderStepTemplate>
    )
}