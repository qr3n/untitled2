'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import yandex from './assets/yandex.png'
import ozon from './assets/ozon.png'
import wb from './assets/wb.png'
import ali from './assets/ali.png'
import lamoda from './assets/lamoda.png'
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

interface IProps {
    image: StaticImport,
    text: string,
}

const Shop = (props: IProps) => {
    return (
        <div className='flex items-center gap-4'>
            <Image src={props.image} alt='logo' width={48} className='rounded-md'/>
            <h1 className='text-xl font-semibold'>{ props.text }</h1>
        </div>
    )
}

export const CreateOrderStep3 = () => {
    return (
        <CreateOrderStepTemplate title='Какой склад?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col gap-10'>
                <Shop image={yandex} text='Яндекс маркет'/>
                <Shop image={wb} text='Wildberries'/>
                <Shop image={ozon} text='Ozon'/>
                <Shop image={ali} text='AliExpress'/>
                <Shop image={lamoda} text='Lamoda'/>
            </div>
        </CreateOrderStepTemplate>
    )
}