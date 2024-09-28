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
import wb from "@/app/admin/marketplace/assets/wb.webp";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import box from "@/app/admin/marketplace/assets/box.png";
import palette from "@/app/admin/marketplace/assets/palette.png";
import {BsChat} from "react-icons/bs";
import {UserChat} from "@/app/profile/UserChat";
import {useContext} from "react";
import {IReview, UserChatContext} from "@/app/profile/model";
import {OpenChatButton} from "@/app/profile/OpenChatButton";
import {ProfileOrdersTemplate} from "@/app/profile/orders";
import { ICar, IOrder } from "@/app/admin/model";


interface User {
    email: string
}


export default async function ProfilePage() {
    const token = cookies().get('token')

    if (!token) {
        redirect('/')
    }

    const account = jwtDecode<User>(token.value)
    const orders = await fetch(`https://postavan.com/api/orders?token=${token.value}`, { next: { tags: ['orders'] },  cache: 'no-cache' })
    const rates = await fetch(`https://postavan.com/api/rates?token=${token.value}`, { cache: 'no-cache' })
    const data = await fetch(`https://postavan.com/api/cars?token=${token.value}`, { cache: 'no-cache' })

    const cars: ICar[] = await data.json()
    const ratesres: IReview[] = await rates.json()
    const resnotsorted: IOrder[] = await orders.json()
    const res = resnotsorted.reverse()

    const activeOrders = res.filter(order =>
        (order.status === 'active') ||
        (order.courier_status === 'В пути') ||
        (order.courier_status === 'На погрузке') ||
        (order.courier_status === 'Выполняет')
    )
    const disabledOrders = res.filter(order =>
        (order.status === 'disabled') &&
        (order.courier_status !== 'В пути') &&
        (order.courier_status !== 'На погрузке') &&
        (order.courier_status !== 'Выполняет')
    )
    return (
        <div className="w-screen h-screen flex flex-col items-center mt-12">
            <h1 className='text-3xl font-semibold'>Пользователь</h1>
            <p className='text-[#A0A0A0] mt-2'>{ account.email }</p>

            <UserChat token={token.value}>
                <Tabs defaultValue="now" className="mt-6 w-full flex items-center justify-center flex-col">
                    <TabsList>
                        <TabsTrigger value="now">В процессе</TabsTrigger>
                        <TabsTrigger value="completed">Завершены</TabsTrigger>
                    </TabsList>
                    <TabsContent value="now" className='w-full'>
                        <div className='px-4 sm:px-[10%] md:px-[15%] lg:px-[20%] xl:px-[25%] h-[calc(100dvh-300px)] overflow-y-auto'>
                            <ProfileOrdersTemplate cars={cars} orders={activeOrders} variant='active'/>
                        </div>
                    </TabsContent>
                    <TabsContent value="completed" className='w-full'>
                        <div
                            className='px-4 sm:px-[10%] md:px-[15%] lg:px-[20%] xl:px-[25%] h-[calc(100dvh-300px)] overflow-y-auto'>
                            <ProfileOrdersTemplate cars={cars} reviews={ratesres} orders={disabledOrders} variant='disabled'/>
                        </div>
                    </TabsContent>
                </Tabs>
            </UserChat>
        </div>
    )
}