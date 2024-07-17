'use client';

import {PropsWithChildren, useContext, useState} from "react";
import {ChatContext, IOrder} from './model'
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import question from "@/app/admin/anything/assets/question.png";
import yandex from "@/app/admin/marketplace/assets/yandex.png";
import ozon from "@/app/admin/marketplace/assets/ozon.png";
import ali from "@/app/admin/marketplace/assets/ali.png";
import lamoda from "@/app/admin/marketplace/assets/lamoda.png";
import wb from "@/app/admin/marketplace/assets/wb.png";
import {BsChat, BsDownload} from "react-icons/bs";
import box from "@/app/admin/marketplace/assets/box.png";
import palette from "@/app/admin/marketplace/assets/palette.png";

interface IProps extends PropsWithChildren {
    orders: IOrder[]
}

const imagesMap = {
    'Яндекс маркет': yandex,
    'Ozon': ozon,
    'AliExpress': ali,
    'Lamoda': lamoda,
    'Wildberriez': wb
}

export const OrdersTemplate = (props: IProps) => {
    const [currentOrder, setCurrentOrder] = useState<IOrder>(props.orders[0])
    const { setChatOpen, setOrderId } = useContext(ChatContext)

    return (
        <Dialog>
            <div className='sm:px-[15%] md:px-[20%] lg:px-[25%] xl:px-[30%] h-[calc(100vh-100px)] overflow-y-auto'>
                <div className='flex w-full flex-col gap-0 p-6 px-4 mt-0 h-[calc(100vh-200px)] overflow-y-auto'>
                    { props.orders.map(order => (
                        <div
                            key={order.id}
                            className='mt-4 w-full flex flex-col relative sm:flex-row justify-between sm:items-center gap-4 bg-[#151515] p-4 rounded-2xl cursor-pointer hover:bg-[#202020] select-none'>
                            <DialogTrigger asChild>
                                <div className='absolute top-0 left-0 rounded-2xl w-full h-full z-10'/>
                            </DialogTrigger>
                            <div className='flex items-center gap-4'>
                            <Image
                                    src={order.cargo === 'anything' ? question : imagesMap[order.warehouse]}
                                    alt={''} width={38} className='rounded-lg'/>
                                <div>
                                    <h1 className='font-semibold'>{order.name}</h1>
                                    <p className='text-[#999] text-sm mt-1'>{order.email}</p>
                                </div>
                            </div>
                            <div className='flex w-full sm:w-max items-center gap-3 justify-center z-20'>
                                <button
                                    className='w-full bg-[#333] px-4 py-2 rounded-full text-sm hover:bg-[#555] '>Закрыть
                                </button>
                                <div className='p-2 rounded-md bg-[#444] hover:bg-[#555]' onClick={() => {
                                    setOrderId(order.id)
                                    setChatOpen(true)
                                }}>
                                    <BsChat/>
                                </div>

                                <div className='p-2 rounded-md bg-[#444] hover:bg-[#555]' onClick={() => {
                                    let text = ''

                                    if (order.cargo === 'marketplace') {
                                        text =
                                            `Магазин\n${order.warehouse}\n\nУпаковка\n${order.packing}\n\nГабариты\n${order.dimensions}\n\nКогда выполнить\nЗабрать ${order.time_to_take}\nДоставить ${order.time_to_deliver}\n\nПожелания\n${order.comment}`
                                    }

                                    else {
                                        text = `Что доставить?\n${order.what_to_deliver}\n\nКакие габариты?\n${order.dimensions}\n\nКогда выполнить\nЗабрать ${order.time_to_take}\nДоставить ${order.time_to_deliver}\n\nПожелания\n${order.comment}`
                                    }

                                    const content = new Blob([text], { type: 'text/plain' });
                                    const fileURL = URL.createObjectURL(content);

                                    const link = document.createElement('a');
                                    link.href = fileURL;
                                    link.download = `${order.name}.txt`;

                                    document.body.appendChild(link);

                                    link.click();

                                    setTimeout(() => {
                                        document.body.removeChild(link);
                                    }, 100);
                                }}>
                                    <BsDownload/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DialogContent className='!rounded-3xl bg-[#161616] h-screen sm:h-[85vh]'>
                {currentOrder.cargo === 'marketplace' ? (
                    <div className='w-full pb-4'>
                        <div className=' text-center w-full items-center'>
                            <h1 className='font-semibold text-3xl flex items-center justify-center gap-2'>
                                <Image src={imagesMap[currentOrder.warehouse]} alt={''}
                                       width={32} className='rounded-lg'/>
                                {currentOrder.name}
                            </h1>
                            <p className='text-[#999] mt-3'>{currentOrder.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                        </div>
                        <div className='mt-8 px-6 h-[calc(100vh-164px)] sm:h-[calc(85vh-164px)] overflow-auto'>
                            <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                            <h1 className='text-xl text-[#999]  mt-4'>Упаковка</h1>
                            <div className='flex items-center gap-2'>
                                <Image width={32}
                                       src={currentOrder.packing === 'box' ? box : palette}
                                       alt={''}/>
                                <p className='mt-1 font-medium'>{currentOrder.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                            </div>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[0]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[1]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[2]}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Куда и
                                откуда</h1>
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
                ) : (
                    <div className='w-full pb-4'>
                        <div className=' text-center w-full items-center'>
                            <h1 className='font-semibold text-3xl flex items-center justify-center gap-2'>
                                <Image src={question} alt={''} width={32}
                                       className='rounded-lg'/>
                                {currentOrder.name}
                            </h1>
                            <p className='text-[#999] mt-3'>{currentOrder.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                        </div>
                        <div className='mt-8 px-6 h-[calc(100vh-164px)] sm:h-[calc(85vh-164px)] overflow-auto'>
                            <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                            <h1 className='text-xl text-[#999]  mt-4'>Что доставить</h1>
                            <p className='mt-1 font-medium'>{currentOrder.what_to_deliver}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[0]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[1]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[2]}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Куда и
                                откуда</h1>
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
                )}
            </DialogContent>
        </Dialog>
    )
}