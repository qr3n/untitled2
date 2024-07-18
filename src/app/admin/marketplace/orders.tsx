'use client';

import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import {IMarketplaceOrder} from "./model";
import ali from './assets/ali.png'
import lamoda from './assets/lamoda.png'
import ozon from './assets/ozon.png'
import wb from './assets/wb.png'
import yandex from './assets/yandex.png'
import {useState} from "react";
import box from './assets/box.png'
import palette from './assets/palette.png'

const imagesMap = {
    'Яндекс маркет': yandex,
    'Ozon': ozon,
    'AliExpress': ali,
    'Lamoda': lamoda,
    'Wildberriez': wb
}

export const Orders = ({ orders }: { orders: IMarketplaceOrder[] }) => {
    const [currentOrder, setCurrentOrder] = useState<IMarketplaceOrder>(orders[0])

    return (
        <Dialog>
            <div className='w-full h-full'>
                <div className='flex w-full flex-col gap-4 p-6 mt-6 h-[calc(100dvh-200px)] overflow-y-auto'>
                    { orders.map(order => (
                        <DialogTrigger asChild key={order.name}>
                            <div onClick={() => setCurrentOrder(order)} className=' w-full flex items-center gap-4 bg-[#151515] p-4 rounded-2xl cursor-pointer hover:bg-[#202020] select-none'>
                                <Image src={imagesMap[order.warehouse]} alt={''} width={38} className='rounded-lg'/>
                                <div>
                                    <h1 className='font-semibold'>{order.name} </h1>
                                    <p className='text-[#999] text-sm mt-1'>{ order.email }</p>
                                </div>
                            </div>
                        </DialogTrigger>
                    )) }
                </div>
            </div>

            <DialogContent className='bg-[#161616] h-screen sm:h-80dvh sm:mt-6'>
                <div className='w-full pb-4 block h-full'>
                    <div className=' text-center w-full items-center'>
                        <h1 className='font-semibold text-3xl flex items-center justify-center gap-2'>
                            <Image src={imagesMap[currentOrder.warehouse]} alt={''} width={32} className='rounded-lg'/>
                            {currentOrder.name}
                        </h1>
                        <p className='text-[#999] mt-3'>{currentOrder.email}</p>
                    </div>
                    <div className='max-h-[calc(100dvh-132px)] overflow-y-auto'>
                        <div className='mt-8 px-6'>
                            <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                            <h1 className='text-xl text-[#999]  mt-4'>Упаковка</h1>
                            <div className='flex items-center gap-2'>
                                <Image width={32} src={currentOrder.packing === 'box' ? box : palette} alt={''}/>
                                <p className='mt-1 font-medium'>{currentOrder.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                            </div>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[0]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[1]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[2]}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Куда и откуда</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Откуда забрать</h1>
                            <p className='mt-1 font-medium'>{currentOrder.addr_from}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>На какой склад</h1>
                            <p className='mt-1 font-medium'>{currentOrder.addr_to}</p>

                            <h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>
                            <p className='mt-1 font-medium'>{currentOrder.time_to_take}</p>
                            <h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>
                            <p className='mt-1 font-medium'>{currentOrder.time_to_deliver}</p>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}