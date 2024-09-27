import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {OrdersTemplate} from "@/app/admin/OrderTemplate";
import { ICar, IOrder } from "@/app/admin/model";
import {Chat} from "@/app/admin/Chat";
import {IDriver, IReview} from "@/app/profile/model";
import { bgDesktop, bgMobile, dolphin } from "@/shared/assets";
import Image from 'next/image'

const createDate = (date: Date) => {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

export default async function AdminPage() {
    const data = await fetch('https://postavan.com/api/orders/all?admin_token=secret', { cache: 'no-cache', next: { tags: ['orders'] } })
    const data2 = await fetch('https://postavan.com/api/rates/all?admin_token=secret', { cache: 'no-cache', next: { tags: ['rates'] } })
    const data3 = await fetch('https://postavan.com/api/drivers/all?admin_token=secret', { cache: 'no-cache', next: { tags: ['drivers'] } })
    const data4 = await fetch(`https://postavan.com/api/cars/all?admin_token=secret`, { cache: 'no-cache' })

    const cars: ICar[] = await data4.json()
    const reviews: IReview[] = await data2.json()
    const ordersnotsorted: IOrder[] = await data.json()
    const orders = ordersnotsorted.reverse()

        const drivers: IDriver[] = await data3.json()
    const activeOrders = orders.filter(order =>
        (order.status === 'active') ||
        (order.courier_status === 'В пути') ||
        (order.courier_status === 'На погрузке') ||
        (order.courier_status === 'Выполняет')
    )
    const disabledOrders = orders.filter(order =>
        (order.status === 'disabled') &&
        (order.courier_status !== 'В пути') &&
        (order.courier_status !== 'На погрузке') &&
        (order.courier_status !== 'Выполняет')
    )
    
    const now = createDate(new Date())

    const nowOrders = activeOrders.filter(order => {
        const date = order.time_to_take.replace(/\s.*/, "");
        return now === date
    })

    const plannedOrders = activeOrders.filter(order => {
        const date = order.time_to_take.replace(/\s.*/, "");
        return now !== date
    })


    return (
        <div className='w-screen h-screen flex flex-col items-center mt-12 gap-6'>
            <h1 className='text-3xl font-semibold'>Все заказы</h1>
            <Chat>
                <Tabs defaultValue='active' className='w-full flex items-center justify-center flex-col'>
                    <TabsList>
                        <TabsTrigger value='active'>Активные</TabsTrigger>
                        <TabsTrigger value='planned'>Запланированные</TabsTrigger>
                        <TabsTrigger value='closed'>Закрытые</TabsTrigger>
                    </TabsList>

                    <TabsContent value='active' className='w-full'>
                        { nowOrders.length > 0 && <OrdersTemplate cars={cars} drivers={drivers} rates={reviews} orders={nowOrders} variant='active'/> }
                        {nowOrders.length === 0 && <div
                            className='w-full h-full flex relative items-center flex-col text-center justify-center'>
                            <Image placeholder="blur" src={bgMobile}
                                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden'
                                   alt='bg'/>
                            <Image placeholder="blur" src={bgDesktop}
                                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block'
                                   alt='bg'/>
                            <div
                                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>
                            <div className='absolute top-8 flex items-center justify-center flex-col'>
                                <Image priority src={dolphin} width={350} height={350} alt='test'
                                       className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                                    Заказов пока нет.
                                </h1>
                                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                                    Попробуйте поискать в <span className='text-blue-500 cursor-pointer'>
                                        другом разделе
                                    </span>
                                </h2>
                            </div>
                        </div>}
                    </TabsContent>

                    <TabsContent value='planned' className='w-full'>
                        {plannedOrders.length > 0 &&
                            <OrdersTemplate cars={cars} drivers={drivers} rates={reviews} orders={plannedOrders}
                                            variant='planned'/>}
                        {plannedOrders.length === 0 && <div
                            className='w-full h-full flex relative items-center flex-col text-center justify-center'>
                            <Image placeholder="blur" src={bgMobile}
                                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden'
                                   alt='bg'/>
                            <Image placeholder="blur" src={bgDesktop}
                                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block'
                                   alt='bg'/>
                            <div
                                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>
                            <div className='absolute top-8 flex items-center justify-center flex-col'>
                                <Image priority src={dolphin} width={350} height={350} alt='test'
                                       className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                                    Заказов пока нет.
                                </h1>
                                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                                    Попробуйте поискать в <span className='text-blue-500 cursor-pointer'>
                                        другом разделе
                                    </span>
                                </h2>
                            </div>
                        </div>}
                    </TabsContent>

                    <TabsContent value='closed' className='w-full'>
                        {disabledOrders.length > 0 &&
                            <OrdersTemplate cars={cars} drivers={drivers} rates={reviews} orders={disabledOrders}
                                            variant='disabled'/>}
                        {disabledOrders.length === 0 && <div
                            className='w-full h-full flex relative items-center flex-col text-center justify-center'>
                            <Image placeholder="blur" src={bgMobile}
                                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden'
                                   alt='bg'/>
                            <Image placeholder="blur" src={bgDesktop}
                                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block'
                                   alt='bg'/>
                            <div
                                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>
                            <div className='absolute top-8 flex items-center justify-center flex-col'>
                                <Image priority src={dolphin} width={350} height={350} alt='test'
                                       className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                                    Заказов пока нет.
                                </h1>
                                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                                    Попробуйте поискать в <span className='text-blue-500 cursor-pointer'>
                                        другом разделе
                                    </span>
                                </h2>
                            </div>
                        </div>}
                    </TabsContent>
                </Tabs>
            </Chat>
        </div>
    )
}