import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {OrdersTemplate} from "@/app/admin/OrderTemplate";
import {IOrder} from "@/app/admin/model";
import {Chat} from "@/app/admin/Chat";
import {IDriver, IReview} from "@/app/profile/model";

const createDate = (date: Date) => {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

export default async function AdminPage() {
    const data = await fetch('http://31.129.96.22/api/orders/all?admin_token=secret', { cache: 'no-cache', next: { tags: ['orders'] } })
    const data2 = await fetch('http://31.129.96.22/api/rates/all?admin_token=secret', { cache: 'no-cache', next: { tags: ['rates'] } })
    const data3 = await fetch('http://31.129.96.22/api/drivers/all?admin_token=secret', { cache: 'no-cache', next: { tags: ['drivers'] } })

    const reviews: IReview[] = await data2.json()
    const ordersnotsorted: IOrder[] = await data.json()
    const orders = ordersnotsorted.reverse()

    const drivers: IDriver[] = await data3.json()
    const activeOrders = orders.filter(order => order.status === 'active')
    const disabledOrders = orders.filter(order => order.status === 'disabled')
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
                        { nowOrders.length > 0 && <OrdersTemplate drivers={drivers} rates={reviews} orders={nowOrders} variant='active'/> }
                    </TabsContent>

                    <TabsContent value='planned' className='w-full'>
                        { plannedOrders.length > 0 && <OrdersTemplate drivers={drivers} rates={reviews} orders={plannedOrders} variant='planned'/> }
                    </TabsContent>

                    <TabsContent value='closed' className='w-full'>
                        { disabledOrders.length > 0 && <OrdersTemplate drivers={drivers} rates={reviews} orders={disabledOrders} variant='disabled'/> }
                    </TabsContent>
                </Tabs>
            </Chat>
        </div>
    )
}