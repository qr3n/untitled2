import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IDriver } from "@/app/admin/model";

const User = ({ email, orders }: { email: string, orders: number }) => {
    return (
        <div className='mt-6 flex gap-4 flex-wrap sm:items-center justify-between bg-[#222] flex-col sm:flex-row hover:bg-[#333] cursor-pointer rounded-2xl p-4 w-full'>
            <h1 className='font-medium'>{ email }</h1>
            <p className='px-3 py-2 w-max rounded-full font-medium' style={{background: orders ? '#2174FFFF' : '#444', color: orders ? 'white' : '#ccc'}}>
                {orders !== 0 ? `${orders} заказ(-ов)` : 'Нет заказов'}
            </p>
        </div>
    )
}

const Driver = (props: IDriver) => {
    return (
        <div
            className='mt-6 flex gap-4 flex-wrap sm:items-center justify-between bg-[#222] flex-col sm:flex-row hover:bg-[#252525] cursor-pointer rounded-2xl p-4 w-full'>
            <div className='flex items-center gap-3'>
                <h1 className='font-medium'>{props.name}</h1>
                <h1 className='font-medium px-3 py-2 bg-[#373737] rounded-full'>{props.driver_email}</h1>
            </div>
            <p className='px-3 py-2 w-max rounded-full font-medium' style={{background: props.phone ? '#2174FFFF' : '#444', color: props.phone ? 'white' : '#ccc'}}>
                {props.phone || 'Телефон не указан'}
            </p>
        </div>
    )
}

export default async function UsersPage() {
    const usersRaw = await fetch('https://postavan.com/api/users', {cache: 'no-cache'})
    const driversRaw = await fetch('https://postavan.com/api/drivers/all', {cache: 'no-cache'})
    const users: { email: string, orders: number }[] = await usersRaw.json()
    const drivers: IDriver[] = await driversRaw.json()

    console.log(drivers)

    return (
        <>
            <h1 className='text-3xl font-semibold text-center mt-24'>Пользователи</h1>

            <div className='flex gap-4 mt-6 px-8 flex-col'>
                <Tabs className='w-full flex items-center justify-center flex-col'>
                    <TabsList>
                        <TabsTrigger value={'clients'}>Клиенты</TabsTrigger>
                        <TabsTrigger value={'drivers'}>Водители</TabsTrigger>
                    </TabsList>
                    <TabsContent value={'clients'} className='w-full h-[calc(100dvh-260px)] px-6 overflow-y-auto mt-5'>
                        {users.map(user => (<User {...user} key={user.email}/>))}
                    </TabsContent>
                    <TabsContent value={'drivers'} className='w-full h-[calc(100dvh-260px)] px-6 overflow-y-auto mt-5'>
                        {drivers.map(driver => (<Driver {...driver} key={driver.driver_email}/>))}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}