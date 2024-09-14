'use client';

import {PropsWithChildren, useContext, useEffect, useState} from "react";
import { ChatContext, ICar, IOrder } from './model'
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import question from "@/app/admin/anything/assets/question.png";
import yandex from "@/app/admin/marketplace/assets/yandex.png";
import ozon from "@/app/admin/marketplace/assets/ozon.png";
import ali from "@/app/admin/marketplace/assets/ali.png";
import lamoda from "@/app/admin/marketplace/assets/lamoda.png";
import wb from "@/app/admin/marketplace/assets/wb.png";
import {BsChat, BsDownload, BsInfo, BsStar} from "react-icons/bs";
import box from "@/app/admin/marketplace/assets/box.png";
import palette from "@/app/admin/marketplace/assets/palette.png";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {revalidateTagFrontend} from "@/shared/revalidate";
import {Loader2} from "lucide-react";
import {AiOutlineEdit} from "react-icons/ai";
import ReactStars from "react-stars";
import {Button} from "@/components/ui/button";
import {IDriver, IReview} from "@/app/profile/model";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface IProps extends PropsWithChildren {
    orders: IOrder[],
    rates: IReview[],
    drivers: IDriver[],
    cars: ICar[],
    variant: 'active' | 'planned' | 'disabled'
}

const imagesMap = {
    'Яндекс маркет': yandex,
    'Ozon': ozon,
    'AliExpress': ali,
    'Lamoda': lamoda,
    'Wildberriez': wb
}

export const OrdersTemplate = (props: IProps) => {
    const [driverWindowOpen, setDriverWindowOpen] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState("")
    const [model, setModel] = useState("")
    const [carNumber, setCarNumber] = useState("")
    const [driverPhone, setDriverPhone] = useState("")
    const [driverName, setDriverName] = useState("")

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (data: { status: 'active' | 'disabled', order_id: number }) => axios.patch(`https://postavan.com/api/order?order_id=${data.order_id}&status=${data.status}`, {}),
        mutationKey: ['order_id'],
    })

    const { mutate: changeCourierStatus, isPending: isCourierStatusPending, isSuccess: isCourierStatusSuccess } = useMutation({
        mutationFn: async (data: { order_id: number, status: string } ) => axios.put(`https://postavan.com/api/courier-status?order_id=${data.order_id}&status=${data.status}`),
        mutationKey: ['courier_status']
    })

    const { mutate: addDriver, isPending: isDriverPending, isSuccess: isDriverSuccess } = useMutation({
        mutationFn: async (data: { order_id: number }) => axios.post(`https://postavan.com/api/driver?order_id=${data.order_id}`, {
            color: color,
            model: model,
            car_number: carNumber,
            driver_phone: driverPhone,
            driver_name: driverName
        }),
        mutationKey: ['driver_id'],
    })

    const [currentOrder, setCurrentOrder] = useState<IOrder>(props.orders[0])
    const { setChatOpen, setOrderId } = useContext(ChatContext)


    useEffect(() => {
        if (driverWindowOpen) {
            setColor(props.drivers.find(d => d.order_id === currentOrderId)?.color || '')
            setModel(props.drivers.find(d => d.order_id === currentOrderId)?.model || '')
            setCarNumber(props.drivers.find(d => d.order_id === currentOrderId)?.car_number || '')
            setDriverPhone(props.drivers.find(d => d.order_id === currentOrderId)?.driver_phone || '')
            setDriverName(props.drivers.find(d => d.order_id === currentOrderId)?.driver_name || '')
        }
    }, [currentOrderId, driverWindowOpen, props.drivers]);


    useEffect(() => {
        if (isDriverSuccess) {
            revalidateTagFrontend('drivers').then(() => setDriverWindowOpen(false))
        }
    }, [isDriverSuccess]);

    useEffect(() => {
        if (isCourierStatusSuccess) {
            revalidateTagFrontend('orders')
        }
    }, [isDriverSuccess]);

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('orders').then(r => setIsLoading(false))
        }
    }, [isSuccess]);

    return (
        <Dialog>
            <div className='sm:px-[1%] md:px-[3%] lg:px-[13%] xl:px-[20%] h-[calc(100dvh-100px)] overflow-y-auto'>
                <div className='flex w-full flex-col gap-0 p-6 px-4 mt-0 h-[calc(100dvh-200px)] overflow-y-auto'>
                    { props.orders.map(order => (
                        <div
                            key={order.id}
                            className='mt-4 w-full flex flex-col relative sm:flex-row justify-between sm:items-center gap-4 bg-[#151515] p-4 rounded-2xl cursor-pointer hover:bg-[#202020] select-none'>
                            <DialogTrigger asChild>
                                <div className='absolute top-0 left-0 rounded-2xl w-full h-full z-10' onClick={() => setCurrentOrder(order)}/>
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
                            <div className='flex w-full sm:w-max items-center gap-3 justify-end z-20'>
                                <div className='flex flex-col sm:flex-row gap-3 w-full'>
                                    <button
                                        onClick={() => {
                                            setIsLoading(true)

                                            mutate({
                                                status: (props.variant === 'active' || props.variant === 'planned') ? 'disabled' : 'active',
                                                order_id: order.id
                                            })
                                        }}
                                        className='w-full sm:min-w-max flex items-center justify-center bg-[#333] px-4 py-2 rounded-full text-sm hover:bg-[#555]'
                                        style={{
                                            color: isLoading || isPending ? '#999' : 'white',
                                        }}>
                                        {(isLoading || isPending) &&
                                            <Loader2 className="text-[#999] h-4 w-4 animate-spin"/>}
                                        {props.variant === 'active' && !(isLoading || isPending) && 'Закрыть'}
                                        {props.variant === 'planned' && !(isLoading || isPending) && 'Закрыть'}
                                        {props.variant === 'disabled' && !(isLoading || isPending) && 'Открыть снова'}
                                    </button>
                                    <Select disabled={isCourierStatusPending} defaultValue={order.courier_status || 'Поиск курьера'} onValueChange={v => changeCourierStatus({
                                        order_id: order.id,
                                        status: v
                                    })}>
                                        <SelectTrigger className="min-w-[180px]">
                                            <SelectValue placeholder="Статус"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Поиск курьера">Поиск курьера</SelectItem>
                                            <SelectItem value="Курьер назначен">Курьер назначен</SelectItem>
                                            <SelectItem value="В пути">В пути</SelectItem>
                                            <SelectItem value="На погрузке">На погрузке</SelectItem>
                                            <SelectItem value="Выполняет">Выполняет</SelectItem>
                                            <SelectItem value="Заказ выполнен">Заказ выполнен</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {(props.variant === 'active' || props.variant === 'planned') && (
                                    <Dialog open={driverWindowOpen} onOpenChange={setDriverWindowOpen}>
                                        <DialogTrigger>
                                            <div className='p-2 rounded-md bg-[#444] hover:bg-[#555]'
                                                 onClick={() => setCurrentOrderId(order.id)}>
                                                <AiOutlineEdit/>
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent
                                            className='gap-0 flex-col rounded-none sm:!rounded-3xl bg-[#161616] h-[100dvh] sm:h-[85dvh]'>
                                            <div className='flex h-full flex-col'>
                                                <div className='flex gap-2 flex-col items-center'>
                                                    <h1 className='text-2xl font-semibold'>Добавить информацию</h1>
                                                </div>
                                                <div
                                                    className='w-full h-full p-3 pt-0 flex gap-2 mt-8 flex-col justify-between items-center'>
                                                    <div className='w-full'>
                                                        <div className='w-full'>
                                                            <h1 className='font-semibold text-lg'>Цвет машины</h1>
                                                            <input
                                                                value={color}
                                                                onChange={e => setColor(e.target.value)}
                                                                className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                                                placeholder='Темно-серый'
                                                            />
                                                        </div>
                                                        <div className='w-full mt-4'>
                                                            <h1 className='font-semibold text-lg'>Модель машины</h1>
                                                            <input
                                                                value={model}
                                                                onChange={e => setModel(e.target.value)}
                                                                className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                                                placeholder='Kia Rio'
                                                            />
                                                        </div>
                                                        <div className='w-full mt-4'>
                                                            <h1 className='font-semibold text-lg'>Номер машины</h1>
                                                            <input
                                                                value={carNumber}
                                                                onChange={e => setCarNumber(e.target.value)}
                                                                className='w-full bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                                                placeholder='A111TB78'
                                                            />
                                                        </div>

                                                        <div className='w-full mt-4'>
                                                            <h1 className='font-semibold text-lg'>Номер водителя</h1>
                                                            <input
                                                                value={driverPhone}
                                                                onChange={e => setDriverPhone(e.target.value)}
                                                                className='w-full resize-none bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                                                placeholder='+79117629553'
                                                            />
                                                        </div>

                                                        <div className='w-full mt-4'>
                                                            <h1 className='font-semibold text-lg'>ФИО водителя</h1>
                                                            <input
                                                                value={driverName}
                                                                onChange={e => setDriverName(e.target.value)}
                                                                className='w-full resize-none bg-[#2A2A2A] border-2 border-transparent mt-2 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                                                                placeholder='+79117629553'
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => isDriverPending ? null : addDriver({order_id: order.id})}
                                                        disabled={
                                                            isDriverPending ||
                                                            !color ||
                                                            !model ||
                                                            !carNumber ||
                                                            !driverPhone ||
                                                            !driverName
                                                        }
                                                        className='
                                                    justify-self-end
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
                                                    active:bg-gray-100 mt-4'>{isDriverPending ? <Loader2
                                                        className="text-[#999] h-4 w-4 animate-spin"/> : 'Отправить'}</Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}

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
                                            `Магазин\n${order.warehouse}\n\nУпаковка\n${order.packing === 'box' ? 'Короб' : 'Палетта'}\n\nГабариты\n${order.dimensions}\n\nКоличество\n${order.count}\n\nКогда выполнить\nЗабрать ${order.time_to_take}\nДоставить ${order.time_to_deliver}\n\nПожелания\n${order.comment}`
                                    } else {
                                        text = `Что доставить\n${order.what_to_deliver}\n\nГабариты\n${order.dimensions}\n\nКоличество\n${order.count}\n\nКогда выполнить\nЗабрать ${order.time_to_take}\nДоставить ${order.time_to_deliver}\n\nПожелания\n${order.comment}`
                                    }

                                    const content = new Blob([text], {type: 'text/plain'});
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


                                {props.rates.find(r => r.order_id === order.id) &&
                                    <Dialog>
                                        <DialogTrigger>
                                            <div className='p-2 rounded-md bg-[#444] hover:bg-[#555]'>
                                                <BsStar style={{color: 'white'}}/>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent
                                            className='flex gap-0 flex-col justify-start rounded-none sm:!rounded-3xl bg-[#161616] h-[100dvh] sm:h-[65dvh]'>
                                            <div className='flex gap-2 flex-col items-center mt-3'>
                                                <h1 className='text-2xl font-semibold'>Отзыв клиента</h1>
                                            </div>
                                            <div
                                                className='mt-3 w-full p-3 pt-0 flex gap-2 h-full flex-col items-center justify-center'>
                                                <ReactStars
                                                    edit={false}
                                                    value={props.rates.find(r => r.order_id === order.id)?.stars}
                                                    count={5}
                                                    size={48}
                                                    color2={'#ffd700'}/>
                                                <div
                                                    className='h-full w-full text-left bg-[#222] text-lg p-5 rounded-xl'>
                                                    {props.rates.find(r => r.order_id === order.id)?.text}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DialogContent className='rounded-none sm:!rounded-3xl bg-[#161616] h-[100dvh] sm:h-[85dvh]'>
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
                        <div className='mt-8 px-6 h-[calc(100dvh-164px)] sm:h-[calc(85dvh-164px)] overflow-auto'>
                            <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                            <h1 className='text-xl text-[#999]  mt-4'>Упаковка</h1>
                            <div className='flex items-center gap-2'>
                                <Image width={32}
                                       src={currentOrder.packing === 'box' ? box : palette}
                                       alt={''}/>
                                <p className='mt-1 font-medium'>{currentOrder.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                            </div>
                            <h1 className='text-xl text-[#999]  mt-4'>Цена</h1>
                            <p className='mt-1 font-medium'>{Math.round(currentOrder.cost / 1000 * 42) + (currentOrder.tariff === 'day' ? 800 : 1000)} руб</p>
                            <p className='-mt-1 text-sm text-[#aaa]'>~{(currentOrder.cost / 1000).toFixed(1).toString().replace('.', ',')} км</p>
                            <p className='mt-1 text-sm text-[#aaa]'>{currentOrder.tariff === 'day' ? 'Дневной' : 'Ночной'} тариф</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[0]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[1]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[2]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Количество</h1>
                            <p className='mt-1 font-medium'>{currentOrder.count + 1}</p>

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

                            <h1 className='text-2xl text-white font-semibold mt-8'>Данные водителя</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Цвет машины</h1>
                            <p className='mt-1 font-medium'>{props.cars.find(c => c.driver_email === currentOrder.driver_email)?.color || '-'}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Модель машины</h1>
                            <p className='mt-1 font-medium'>{props.cars.find(c => c.driver_email === currentOrder.driver_email)?.model || '-'}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Номер машины</h1>
                            <p className='mt-1 font-medium'>{props.cars.find(c => c.driver_email === currentOrder.driver_email)?.number || '-'}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Дополнительно</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Телефон отправителя</h1>
                            <p className='mt-1 font-medium'>{currentOrder.sender_phone ? `+7${currentOrder.sender_phone}` : 'Отсутствует'}</p>
                            <h1 className='text-xl text-[#999] mt-4'>Телефон получателя</h1>
                            <p className='mt-1 font-medium'>{currentOrder.recipient_phone ? `+7${currentOrder.recipient_phone}` : 'Отсутствует'}</p>
                            <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                            <p className='mt-1 font-medium'>{currentOrder.comment || 'Отсутствует'}</p>
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
                        <div className='mt-8 px-6 h-[calc(100dvh-164px)] sm:h-[calc(85dvh-164px)] overflow-auto'>
                            <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                            <h1 className='text-xl text-[#999]  mt-4'>Цена</h1>
                            <p className='mt-1 font-medium'>{Math.round(currentOrder.cost / 1000 * 42) + (currentOrder.tariff === 'day' ? 800 : 1000)} руб</p>
                            <p className='-mt-1 text-sm text-[#aaa]'>~{(currentOrder.cost / 1000).toFixed(1).toString().replace('.', ',')} км</p>
                            <p className='mt-1 text-sm text-[#aaa]'>{currentOrder.tariff === 'day' ? 'Дневной' : 'Ночной'} тариф</p>

                            <h1 className='text-xl text-[#999]  mt-4'>Что доставить</h1>
                            <p className='mt-1 font-medium'>{currentOrder.what_to_deliver}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[0]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[1]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                            <p className='mt-1 font-medium'>{currentOrder.dimensions.split(' ')[2]}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Количество</h1>
                            <p className='mt-1 font-medium'>{currentOrder.count + 1}</p>

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

                            <h1 className='text-2xl text-white font-semibold mt-8'>Данные водителя</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Цвет машины</h1>
                            <p className='mt-1 font-medium'>{props.cars.find(c => c.driver_email === currentOrder.driver_email)?.color || '-'}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Модель машины</h1>
                            <p className='mt-1 font-medium'>{props.cars.find(c => c.driver_email === currentOrder.driver_email)?.model || '-'}</p>
                            <h1 className='text-xl mt-4 text-[#999]'>Номер машины</h1>
                            <p className='mt-1 font-medium'>{props.cars.find(c => c.driver_email === currentOrder.driver_email)?.number || '-'}</p>

                            <h1 className='text-2xl text-white font-semibold mt-8'>Дополнительно</h1>
                            <h1 className='text-xl text-[#999] mt-4'>Телефон отправителя</h1>
                            <p className='mt-1 font-medium'>{currentOrder.sender_phone ? `+7${currentOrder.sender_phone}` : 'Отсутствует'}</p>
                            <h1 className='text-xl text-[#999] mt-4'>Телефон получателя</h1>
                            <p className='mt-1 font-medium'>{currentOrder.recipient_phone ? `+7${currentOrder.recipient_phone}` : 'Отсутствует'}</p>
                            <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                            <p className='mt-1 font-medium'>{currentOrder.comment || 'Отсутствует'}</p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}