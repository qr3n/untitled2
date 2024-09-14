'use client';

import { ICar, IOrder } from "@/app/admin/model";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import question from "@/app/profile/q.png";
import {OpenChatButton} from "@/app/profile/OpenChatButton";
import box from "@/app/admin/marketplace/assets/box.png";
import palette from "@/app/admin/marketplace/assets/palette.png";
import yandex from "@/app/admin/marketplace/assets/yandex.png";
import ozon from "@/app/admin/marketplace/assets/ozon.png";
import ali from "@/app/admin/marketplace/assets/ali.png";
import lamoda from "@/app/admin/marketplace/assets/lamoda.png";
import wb from "@/app/admin/marketplace/assets/wb.png";
import {BsChat, BsStar} from "react-icons/bs";
import {ChangeEvent, useCallback, useState} from "react";
import {Button} from "@/components/ui/button";
import ReactStars from 'react-stars'
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useCookies} from "next-client-cookies";
import {Loader2} from "lucide-react";
import {IReview} from "@/app/profile/model";

interface IProps {
    orders: IOrder[],
    variant: 'active' | 'disabled',
    reviews?: IReview[],
    cars: ICar[]
}

const imagesMap = {
    'Яндекс маркет': yandex,
    'Ozon': ozon,
    'AliExpress': ali,
    'Lamoda': lamoda,
    'Wildberriez': wb
}

export const ProfileOrdersTemplate = ({ orders, variant, reviews, cars }: IProps) => {
    const cookies = useCookies()
    const [stars, setStars] = useState(0)
    const [currentOrderId, setCurrentOrderId] = useState(0)
    const [a, setA] = useState(false)
    const [textReview, setTextReview] = useState('')
    const { mutate, isPending } = useMutation({
        mutationFn: async (order_id: number) => axios.post(`https://postavan.com/api/rating?token=${cookies.get('token')}`, {
            text: textReview,
            stars: stars,
            order_id: order_id
        }).then(() => setA(false)),
        mutationKey: ['rating']
    })


    console.log(reviews)
    const handleOnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextReview(event.target.value)
    },[])

    return (
        <>
            {
                orders.map((order, index) => (
                    <Dialog key={index}>
                        <>
                            <div
                                className='mt-4 relative w-full flex justify-between items-center bg-[#151515] p-4 rounded-2xl cursor-pointer hover:bg-[#202020] select-none'>
                                <div className='flex items-center gap-4'>
                                    <DialogTrigger asChild>
                                        <div className='absolute top-0 left-0 rounded-2xl w-full h-full z-10'/>
                                    </DialogTrigger>
                                    <Image
                                        src={order.cargo === 'anything' ? question : imagesMap[order.warehouse]}
                                        alt={''} width={38} className='rounded-lg'/>
                                    <div>
                                        <h1 className='font-semibold'>{order.name}</h1>
                                        <p className='text-[#999] text-sm mt-1'>{order.cost}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <div className='bg-[#333] py-2 px-4 rounded-2xl text-[#ddd]'>
                                        { order.courier_status || 'Поиск курьера' }
                                    </div>

                                    <div className='flex gap-4 h-max w-max'>
                                        <OpenChatButton orderId={order.id}/>
                                        {variant === 'disabled' && <div onClick={() => {
                                            if (!reviews?.find(r => r.order_id === order.id)) {
                                                setCurrentOrderId(order.id)
                                                setA(true)
                                            }
                                        }} className='z-20 p-2 rounded-md bg-[#444] hover:bg-[#555]'>
                                            <BsStar
                                                style={{color: reviews?.find(r => r.order_id === order.id) ? 'yellow' : 'white'}}/>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </>
                        <DialogContent className='rounded-none sm:!rounded-3xl bg-[#161616] h-[100dvh] sm:h-[85dvh]'>
                            {order.cargo === 'marketplace' ? (
                                <div className='w-full pb-4'>
                                    <div className=' text-center w-full items-center'>
                                        <h1 className='font-semibold text-3xl flex items-center justify-center gap-2'>
                                            <Image src={imagesMap[order.warehouse]} alt={''}
                                                   width={32} className='rounded-lg'/>
                                            {order.name}
                                        </h1>
                                        <p className='text-[#999] mt-3'>{order.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                                    </div>
                                    <div
                                        className='mt-8 px-6 h-[calc(100dvh-164px)] sm:h-[calc(85dvh-164px)] overflow-auto'>
                                        <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                                        <h1 className='text-xl text-[#999]  mt-4'>Упаковка</h1>
                                        <div className='flex items-center gap-2'>
                                            <Image width={32}
                                                   src={order.packing === 'box' ? box : palette}
                                                   alt={''}/>
                                            <p className='mt-1 font-medium'>{order.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                                        </div>
                                        <h1 className='text-xl text-[#999]  mt-4'>Цена</h1>
                                        <p className='mt-1 font-medium'>{Math.round(order.cost / 1000 * 42) + (order.tariff === 'day' ? 800 : 1000)} руб</p>
                                        <p className='-mt-1 text-sm text-[#aaa]'>~{(order.cost / 1000).toFixed(1).toString().replace('.', ',')}км</p>
                                        <p className='mt-1 text-sm text-[#aaa]'>{order.tariff === 'day' ? 'Дневной' : 'Ночной'} тариф</p>

                                        <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                                        <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[0]}</p>
                                        <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[1]}</p>
                                        <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[2]}</p>
                                        <h1 className='text-xl mt-4 text-[#999]'>Количество</h1>
                                        <p className='mt-1 font-medium'>{order.count + 1}</p>

                                        <h1 className='text-2xl text-white font-semibold mt-8'>Куда и
                                            откуда</h1>
                                        <h1 className='text-xl text-[#999] mt-4'>Откуда забрать</h1>
                                        <p className='mt-1 font-medium'>{order.addr_from}</p>
                                        <h1 className='text-xl mt-4 text-[#999]'>На какой склад</h1>
                                        <p className='mt-1 font-medium'>{order.addr_to}</p>

                                        <h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>
                                        <p className='mt-1 font-medium'>{order.time_to_take}</p>
                                        <h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>
                                        <p className='mt-1 font-medium'>{order.time_to_deliver}</p>

                                        <h1 className='text-2xl text-white font-semibold mt-8'>Данные водителя</h1>
                                        <h1 className='text-xl text-[#999] mt-4'>Цвет машины</h1>
                                        <p className='mt-1 font-medium'>{cars.find(c => c.driver_email === order.driver_email)?.color || '-'}</p>
                                        <h1 className='text-xl mt-4 text-[#999]'>Модель машины</h1>
                                        <p className='mt-1 font-medium'>{cars.find(c => c.driver_email === order.driver_email)?.model || '-'}</p>
                                        <h1 className='text-xl mt-4 text-[#999]'>Номер машины</h1>
                                        <p className='mt-1 font-medium'>{cars.find(c => c.driver_email === order.driver_email)?.number || '-'}</p>


                                        <h1 className='text-2xl text-white font-semibold mt-8'>Дополнительно</h1>
                                        <h1 className='text-xl text-[#999] mt-4'>Телефон отправителя</h1>
                                        <p className='mt-1 font-medium'>{order.sender_phone ? `+7${order.sender_phone}` : 'Отсутствует'}</p>
                                        <h1 className='text-xl text-[#999] mt-4'>Телефон получателя</h1>
                                        <p className='mt-1 font-medium'>{order.recipient_phone ? `+7${order.recipient_phone}` : 'Отсутствует'}</p>
                                        <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                                        <p className='mt-1 font-medium'>{order.comment || 'Отсутствует'}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='w-full pb-4'>
                                    <div className=' text-center w-full items-center'>
                                        <h1 className='font-semibold text-3xl flex items-center justify-center gap-2'>
                                            <Image src={question} alt={''} width={32}
                                                   className='rounded-lg'/>
                                            {order.name}
                                        </h1>
                                        <p className='text-[#999] mt-3'>{order.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                                    </div>
                                    <div
                                        className='mt-8 px-6 h-[calc(100dvh-164px)] sm:h-[calc(85dvh-164px)] overflow-auto'>
                                    <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                                    <h1 className='text-xl text-[#999]  mt-4'>Что доставить</h1>
                                    <p className='mt-1 font-medium'>{order.what_to_deliver}</p>
                                    <h1 className='text-xl text-[#999]  mt-4'>Цена</h1>
                                    <p className='mt-1 font-medium'>{Math.round(order.cost / 1000 * 42) + (order.tariff === 'day' ? 800 : 1000)} руб</p>
                                    <p className='-mt-1 text-sm text-[#aaa]'>~{(order.cost / 1000).toFixed(1).toString().replace('.', ',')}</p>
                                    <p className='mt-1 text-sm text-[#aaa]'>{order.tariff === 'day' ? 'Дневной' : 'Ночной'} тариф</p>

                                    <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                                    <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                                    <p className='mt-1 font-medium'>{order.dimensions.split(' ')[0]}</p>
                                    <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                                    <p className='mt-1 font-medium'>{order.dimensions.split(' ')[1]}</p>
                                    <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                                    <p className='mt-1 font-medium'>{order.dimensions.split(' ')[2]}</p>
                                    <h1 className='text-xl mt-4 text-[#999]'>Количество</h1>
                                    <p className='mt-1 font-medium'>{order.count + 1}</p>

                                    <h1 className='text-2xl text-white font-semibold mt-8'>Куда и
                                        откуда</h1>
                                    <h1 className='text-xl text-[#999] mt-4'>Откуда забрать</h1>
                                    <p className='mt-1 font-medium'>{order.addr_from}</p>
                                    <h1 className='text-xl mt-4 text-[#999]'>Куда доставить</h1>
                                    <p className='mt-1 font-medium'>{order.addr_to}</p>

                                    <h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>
                                    <p className='mt-1 font-medium'>{order.time_to_take}</p>
                                    <h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>
                                    <p className='mt-1 font-medium'>{order.time_to_deliver}</p>

                                    <h1 className='text-2xl text-white font-semibold mt-8'>Данные водителя</h1>
                                    <h1 className='text-xl text-[#999] mt-4'>Цвет машины</h1>
                                    <p className='mt-1 font-medium'>{cars.find(c => c.driver_email === order.driver_email)?.color || '-'}</p>
                                    <h1 className='text-xl mt-4 text-[#999]'>Модель машины</h1>
                                    <p className='mt-1 font-medium'>{cars.find(c => c.driver_email === order.driver_email)?.model || '-'}</p>
                                    <h1 className='text-xl mt-4 text-[#999]'>Номер машины</h1>
                                    <p className='mt-1 font-medium'>{cars.find(c => c.driver_email === order.driver_email)?.number || '-'}</p>


                                    <h1 className='text-2xl text-white font-semibold mt-8'>Дополнительно</h1>
                                    <h1 className='text-xl text-[#999] mt-4'>Телефон отправителя</h1>
                                    <p className='mt-1 font-medium'>{order.sender_phone ? `+7${order.sender_phone}` : 'Отсутствует'}</p>
                                    <h1 className='text-xl text-[#999] mt-4'>Телефон получателя</h1>
                                    <p className='mt-1 font-medium'>{order.recipient_phone ? `+7${order.recipient_phone}` : 'Отсутствует'}</p>
                                    <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                                    <p className='mt-1 font-medium'>{order.comment || 'Отсутствует'}</p>
                                </div>
                            </div>
                            )}
                        </DialogContent>
                    </Dialog>
                ))
            }

            {variant === 'disabled' && <Dialog open={a} onOpenChange={() => setA(!a)}>
                <DialogContent
                    className='flex gap-0 flex-col justify-start rounded-none sm:!rounded-3xl bg-[#161616] h-[100dvh] sm:h-[65dvh]'>
                    <div className='flex gap-2 flex-col items-center mt-3'>
                        <h1 className='text-2xl font-semibold'>Оставить отзыв</h1>
                    </div>
                    <div className='mt-3 w-full p-3 pt-0 flex gap-2 h-full flex-col items-center justify-center'>
                        <ReactStars
                            value={stars}
                            onChange={s => setStars(s)}
                            count={5}
                            size={48}
                            color2={'#ffd700'} />
                        <textarea onChange={handleOnChange} className='w-full h-full resize-none bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                  placeholder='Все было хорошо, но мне не хватило...'
                        />
                        <Button disabled={isPending} onClick={() => mutate(currentOrderId)} className='
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    px-8
                    py-2
                    bg-white
                    text-black
                    rounded-full
                    font-bold
                    active:bg-gray-100 mt-4'>{isPending ? <Loader2 className="text-[#999] h-4 w-4 animate-spin" /> : 'Отправить'}</Button>
                    </div>
                </DialogContent>
            </Dialog>}
        </>
    )
}