import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cookies } from 'next/headers'
import {jwtDecode} from 'jwt-decode';
import {redirect} from "next/navigation";
import {Orders} from "@/app/profile/orders";


interface User {
    email: string
}

export default async function ProfilePage() {
    const token = cookies().get('token')

    if (!token) {
        redirect('/')
    }

    const account = jwtDecode<User>(token.value)

    return (
        <div className="w-screen h-screen flex flex-col items-center mt-24 sm:mt-32">
            <h1 className='text-3xl font-bold'>Новый пользователь</h1>
            <p className='text-[#A0A0A0] mt-2'>{ account.email }</p>

            <Tabs defaultValue="now" className="mt-16 w-full flex items-center justify-center flex-col">
                <TabsList>
                    <TabsTrigger value="now">В процессе</TabsTrigger>
                    <TabsTrigger value="completed">Завершены</TabsTrigger>
                    <TabsTrigger value="canceled">Отменены</TabsTrigger>
                </TabsList>
                <TabsContent value="now" className='w-full'><Orders/></TabsContent>
                <TabsContent value="completed"></TabsContent>
                <TabsContent value="canceled"></TabsContent>
            </Tabs>
        </div>
    )
}