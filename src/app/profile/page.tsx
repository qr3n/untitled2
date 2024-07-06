import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cookies } from 'next/headers'
import {jwtDecode} from 'jwt-decode';
import {redirect} from "next/navigation";

interface User {
    email: string
}

export default function ProfilePage() {
    const token = cookies().get('token')

    if (!token) {
        redirect('/')
    }

    const account = jwtDecode<User>(token.value)

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className='text-3xl font-bold'>{ account.email }</h1>
            <p className='text-[#A0A0A0] mt-2'>{ account.email }</p>

            <Tabs defaultValue="account" className="mt-16 w-full flex items-center justify-center flex-col">
                <TabsList>
                    <TabsTrigger value="now">В процессе</TabsTrigger>
                    <TabsTrigger value="completed">Завершены</TabsTrigger>
                    <TabsTrigger value="canceled">Отменены</TabsTrigger>
                </TabsList>
                <TabsContent value="now">Make changes to your account here.</TabsContent>
                <TabsContent value="completed">Change your password here.</TabsContent>
                <TabsContent value="canceled">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}