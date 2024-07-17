import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cookies } from 'next/headers'
import {jwtDecode} from 'jwt-decode';
import {redirect} from "next/navigation";
import Image from "next/image";
import question from "./q.png";
import yandex from "@/app/admin/marketplace/assets/yandex.png";
import ozon from "@/app/admin/marketplace/assets/ozon.png";
import ali from "@/app/admin/marketplace/assets/ali.png";
import lamoda from "@/app/admin/marketplace/assets/lamoda.png";
import wb from "@/app/admin/marketplace/assets/wb.png";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import box from "@/app/admin/marketplace/assets/box.png";
import palette from "@/app/admin/marketplace/assets/palette.png";
import {BsChat} from "react-icons/bs";
import {UserChat} from "@/app/profile/UserChat";
import {useContext} from "react";
import {UserChatContext} from "@/app/profile/model";
import {OpenChatButton} from "@/app/profile/OpenChatButton";


interface User {
    email: string
}



export interface IAnythingOrder {
    id: number
    email: string
    name: string,
    cargo: string,
    warehouse: 'Яндекс маркет' | 'Ozon' | 'AliExpress' | 'Lamoda' | 'Wildberriez',
    what_to_deliver: string,
    packing: 'box' | 'palette',
    dimensions: string,
    time_to_take: string,
    time_to_deliver: string,
    addr_to: string,
    addr_from: string
}


interface IMarketplaceOrder {
    id: number
    email: string
    name: string,
    cargo: string,
    warehouse: 'Яндекс маркет' | 'Ozon' | 'AliExpress' | 'Lamoda' | 'Wildberriez',
    what_to_deliver: string,
    packing: 'box' | 'palette',
    dimensions: string,
    time_to_take: string,
    time_to_deliver: string,
    addr_to: string,
    addr_from: string
}

interface IOrder extends IMarketplaceOrder, IAnythingOrder {}

const imagesMap = {
    'Яндекс маркет': yandex,
    'Ozon': ozon,
    'AliExpress': ali,
    'Lamoda': lamoda,
    'Wildberriez': wb
}



export default async function ProfilePage() {
    const token = cookies().get('token')

    if (!token) {
        redirect('/')
    }

    const account = jwtDecode<User>(token.value)
    const orders = await fetch(`https://emarket-1ans.onrender.com/orders?token=${token.value}`, { cache: 'no-cache' })
    const res: IOrder[] = await orders.json()

    return (
        <div className="w-screen h-screen flex flex-col items-center mt-12">
            <h1 className='text-3xl font-semibold'>Новый пользователь</h1>
            <p className='text-[#A0A0A0] mt-2'>{ account.email }</p>

            <UserChat token={token.value}>
                <Tabs defaultValue="now" className="mt-6 w-full flex items-center justify-center flex-col">
                    <TabsList>
                        <TabsTrigger value="now">В процессе</TabsTrigger>
                        <TabsTrigger value="completed">Завершены</TabsTrigger>
                        <TabsTrigger value="canceled">Отменены</TabsTrigger>
                    </TabsList>
                    <TabsContent value="now" className='w-full'>
                        <div className='px-4 sm:px-[15%] md:px-[20%] lg:px-[25%] xl:px-[30%] h-[calc(100svh-300px)] overflow-y-auto'>
                            {
                                res.map((order, index) => (
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
                                                        <p className='text-[#999] text-sm mt-1'>{order.time_to_take}</p>
                                                    </div>
                                                </div>
                                                <OpenChatButton orderId={order.id}/>
                                            </div>

                                        </>
                                        <DialogContent className='!rounded-3xl bg-[#161616] h-screen sm:h-[85svh]'>
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
                                                    <div className='mt-8 px-6 h-[calc(100svh-164px)] sm:h-[calc(85svh-164px)] overflow-auto'>
                                                        <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                                                        <h1 className='text-xl text-[#999]  mt-4'>Упаковка</h1>
                                                        <div className='flex items-center gap-2'>
                                                            <Image width={32}
                                                                   src={order.packing === 'box' ? box : palette}
                                                                   alt={''}/>
                                                            <p className='mt-1 font-medium'>{order.packing === 'box' ? 'Короб' : 'Палетта'}</p>
                                                        </div>

                                                        <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                                                        <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[0]}</p>
                                                        <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[1]}</p>
                                                        <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[2]}</p>

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
                                                    <div className='mt-8 px-6 h-[calc(100svh-164px)] sm:h-[calc(85svh-164px)] overflow-auto'>
                                                        <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                                                        <h1 className='text-xl text-[#999]  mt-4'>Что доставить</h1>
                                                        <p className='mt-1 font-medium'>{order.what_to_deliver}</p>

                                                        <h1 className='text-2xl text-white font-semibold mt-8'>Размеры</h1>
                                                        <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[0]}</p>
                                                        <h1 className='text-xl mt-4 text-[#999]'>Ширина</h1>
                                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[1]}</p>
                                                        <h1 className='text-xl mt-4 text-[#999]'>Высота</h1>
                                                        <p className='mt-1 font-medium'>{order.dimensions.split(' ')[2]}</p>

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
                                                    </div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="completed"></TabsContent>
                    <TabsContent value="canceled"></TabsContent>
                </Tabs>
            </UserChat>
        </div>
    )
}