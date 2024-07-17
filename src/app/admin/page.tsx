import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {OrdersTemplate} from "@/app/admin/OrderTemplate";
import {IOrder} from "@/app/admin/model";
import {Chat} from "@/app/admin/Chat";

export default async function AdminPage() {
    const data = await fetch('https://emarket-1ans.onrender.com/orders/all?admin_token=secret', { cache: 'no-cache' })
    const orders: IOrder[] = await data.json()

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
                        { orders.length > 0 && <OrdersTemplate orders={orders}/> }
                    </TabsContent>

                    <TabsContent value='planned' className='w-full'>
                        { orders.length > 0 && <OrdersTemplate orders={orders}/> }
                    </TabsContent>

                    <TabsContent value='closed' className='w-full'>
                        { orders.length > 0 && <OrdersTemplate orders={orders}/> }
                    </TabsContent>
                </Tabs>
            </Chat>
        </div>
    )
}