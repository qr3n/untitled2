'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { EditOrderContext } from "@/features/order/edit/model/context";
import { IOrder } from "@/app/admin/model";
import Image from "next/image";
import yandex from "@/app/admin/marketplace/assets/yandex.png";
import ozon from "@/app/admin/marketplace/assets/ozon.png";
import ali from "@/app/admin/marketplace/assets/ali.png";
import lamoda from "@/app/admin/marketplace/assets/lamoda.png";
import wb from "@/app/admin/marketplace/assets/wb.webp";
import { Button } from "@/components/ui/button";
import box from "@/app/admin/marketplace/assets/box.png";
import palette from "@/app/admin/marketplace/assets/palette.png";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { revalidateTagFrontend } from "@/shared/revalidate";
import { Loader2 } from "lucide-react";

const EditAnythingOrder = ({ order }: { order: IOrder }) => {
    return (
        <>

        </>
    )
}

const notSelectedStyle = {
    background: 'none',
    border: '1px solid transparent'
}

const selectedStyle = {
    background: 'rgba(63,63,255,0.2)',
    border: '1px solid #2174FFFF'
}

const EditMarketplaceOrder = ({ order, setOpen }: { order: IOrder, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [loading, setLoading] = useState(false)
    const cookies = useCookies()
    const token = cookies.get('token')
    const [packing, setPacking] = useState<'box' | 'palette'>(order.packing)
    const [length, setLength] = useState(order.dimensions.split(' ')[0])
    const [width, setWidth] = useState(order.dimensions.split(' ')[1])
    const [height, setHeight] = useState(order.dimensions.split(' ')[2])
    const [senderPhone, setSenderPhone] = useState(order.sender_phone)
    const [recipientPhone, setRecipientPhone] = useState(order.recipient_phone)
    const [comment, setComment] = useState(order.comment)
    const [addrFrom, setAddrFrom] = useState(order.addr_from)
    const [addrTo, setAddrTo] = useState(order.addr_to)

    const submit = () => {
        setLoading(true)

        axios.put(`https://postavan.com/api/order/update?id=${order.id}&token=${token}`, {
            cargo: order.cargo,
            warehouse: order.warehouse,
            what_to_deliver: [],
            packing: packing,
            dimensions: [length, width, height],
            addr_to: [addrTo],
            addr_from: [addrFrom],
            time_to_take: order.time_to_take,
            time_to_deliver: order.time_to_deliver,
            comment: comment,
            status: 'active',
            sender_phone: senderPhone,
            recipient_phone: recipientPhone,
            count: order.count,
            tariff: order.tariff
        }, { withCredentials: true }).then(r => {
            revalidateTagFrontend('orders').then(() => {
                setLoading(false);
                setOpen(false)
            })
        })
    }

    return (
        <>
            <div
                className='mt-8 px-6 h-[calc(100dvh-240px)] sm:h-[calc(85dvh-280px)] overflow-auto w-full flex items-start flex-col'>
                <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                <h1 className='text-xl text-[#999]  mt-4'>Упаковка</h1>
                <div className='flex items-center gap-2 mt-2'>
                    <div onClick={() => setPacking('box')} className='px-3 py-1.5 rounded-full cursor-pointer'
                         style={packing === 'box' ? selectedStyle : notSelectedStyle}>Коробка
                    </div>
                    <div onClick={() => setPacking('palette')} className='px-3 py-1.5 rounded-full cursor-pointer'
                         style={packing === 'palette' ? selectedStyle : notSelectedStyle}>Палетта
                    </div>
                </div>
                <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                <input
                    value={length}
                    onChange={e => setLength(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Длина'
                />
                <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                <input
                    value={width}
                    onChange={e => setWidth(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Ширина'
                />
                <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                <input
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Высота'
                />
                <h1 className='text-xl mt-4 text-[#999]'>Количество</h1>
                <p className='mt-1 font-medium'>{Number(order.count) + 1}</p>

                <h1 className='text-2xl text-white font-semibold mt-8'>Куда и
                    откуда</h1>
                <h1 className='text-xl text-[#999] mt-4'>Откуда забрать</h1>
                <input
                    value={addrFrom}
                    onChange={e => setAddrFrom(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Комментарий'
                />
                <h1 className='text-xl mt-4 text-[#999]'>На какой склад</h1>
                <input
                    value={addrTo}
                    onChange={e => setAddrTo(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Комментарий'
                />
                {/*<h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>*/}
                {/*<p className='mt-1 font-medium'>{order.time_to_take}</p>*/}
                {/*<h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>*/}
                {/*<p className='mt-1 font-medium'>{order.time_to_deliver}</p>*/}

                <h1 className='text-2xl text-white font-semibold mt-8'>Дополнительно</h1>
                <h1 className='text-xl text-[#999] mt-4'>Телефон отправителя</h1>
                <input
                    value={senderPhone}
                    onChange={e => setSenderPhone(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Телефон отправителя'
                />
                <h1 className='text-xl text-[#999] mt-4'>Телефон получателя</h1>
                <input
                    value={recipientPhone}
                    onChange={e => setRecipientPhone(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Телефон получателя'
                />
                <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                <input
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Комментарий'
                />
            </div>
            <Button disabled={loading} className='w-full rounded-full mt-8' onClick={submit}>
                Сохранить
                {loading && <Loader2 className="text-white ml-2 h-4 w-4 animate-spin"/>}
            </Button>
        </>
    )
}

const imagesMap = {
    'Яндекс маркет': yandex,
    'Ozon': ozon,
    'AliExpress': ali,
    'Lamoda': lamoda,
    'Wildberries': wb
}


export const EditOrderModal = (props: PropsWithChildren) => {
    const [open, setOpen] = useState(false)
    const [order, setOrder] = useState<IOrder | null>(null)


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <EditOrderContext.Provider value={{
                setOpen,
                order,
                setOrder
            }}>
                {props.children}
            </EditOrderContext.Provider>

            <DialogContent className='bg-[#161616] h-screen sm:h-[80dvh]'>
                {order && (
                    <div className='flex flex-col text-center w-full items-center'>
                        <h1 className='font-semibold text-3xl flex items-center justify-center gap-2'>
                            <Image src={imagesMap[order.warehouse]} alt={''}
                                   width={32} className='rounded-lg'/>
                            {order.name}
                        </h1>
                        <p className='text-white bg-blue-500 font-medium px-3 py-1.5 rounded-full w-max text-sm mt-4'>Редактирование</p>
                        <EditMarketplaceOrder order={order} setOpen={setOpen}/> : <EditAnythingOrder order={order}/>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}