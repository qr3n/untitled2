'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import yandex from './assets/yandex.png'
import ozon from './assets/ozon.png'
import wb from './assets/wb.png'
import ali from './assets/ali.png'
import lamoda from './assets/lamoda.png'
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {useState} from "react";
import check from './assets/check.png'

interface IProps {
    image: StaticImport,
    text: string,
    current: string,
    setCurrent: (v: string) => void,
}

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

const Shop = (props: IProps) => {
    return (
        <div style={props.current === props.text ? selectedStyle : notSelectedStyle} className='relative py-4 px-6 pr-24 flex cursor-pointer items-center gap-4' onClick={() => props.setCurrent(props.text)}>
            <Image src={props.image} alt='logo' width={48} className='rounded-md'/>
            <h1 className='text-xl font-semibold'>{ props.text }</h1>
            { props.current === props.text && <Image src={check} className='absolute right-5 top-1/2 -translate-y-1/2' alt='check' width={20}/> }
        </div>
    )
}

export const CreateOrderStep3 = () => {
    const [current, setCurrent] = useState('Яндекс маркет');

    return (
        <CreateOrderStepTemplate title='Какой склад?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col gap-3'>
                <Shop image={yandex} text='Яндекс маркет' current={current} setCurrent={setCurrent}/>
                <Shop image={wb} text='Wildberries' current={current} setCurrent={setCurrent}/>
                <Shop image={ozon} text='Ozon' current={current} setCurrent={setCurrent}/>
                <Shop image={ali} text='AliExpress' current={current} setCurrent={setCurrent}/>
                <Shop image={lamoda} text='Lamoda' current={current} setCurrent={setCurrent}/>
            </div>
        </CreateOrderStepTemplate>
    )
}