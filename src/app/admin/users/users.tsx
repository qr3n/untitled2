'use client';

import { useEffect, useState } from "react";
import { DotIcon, Loader2 } from "lucide-react";

interface IMessage {
    type: 'users' | 'drivers' | 'init',
    value: number,
    users: number,
    drivers: number
}

export const Users = () => {
    const [activeUsers, setActiveUsers] = useState<number | null>(0)
    const [activeDrivers, setActiveDrivers] = useState<number | null>(0)

    useEffect(() => {
        const ws = new WebSocket('wss://postavan.com/api/users')

        ws.onmessage = m => {
            const data: IMessage = JSON.parse(m.data)

            switch (data.type) {
                case "init":
                    setActiveUsers(data.users)
                    setActiveDrivers(data.drivers)
                    break

                case "drivers":
                    setActiveDrivers(data.value)
                    break

                case "users":
                    setActiveUsers(data.value)
                    break
            }
        }

        return () => ws.close()
    }, [])

    return (activeDrivers !== null) && (activeUsers !== null) ? (
        <div className='flex max-w-4xl w-full mt-8 flex-col sm:flex-row'>
            <div className='w-full sm:w-1/2 h-full flex'>
                <div className='bg-[#202020] m-4 p-6 rounded-2xl w-full'>
                    <h1 className='text-2xl font-semibold'>Клиенты</h1>
                    <h1 className='text-lg mt-2 flex items-center'>Зарегестрировано <DotIcon
                        className='w-10 h-10 -ml-2 text-blue-500'/></h1>
                    <p className='text-md font-medium bg-blue-500 w-max rounded-full px-3'>...</p>
                    <h1 className='text-lg mt-4 flex items-center'> В сети <DotIcon
                        className='w-10 h-10 -ml-2 text-green-500'/></h1>
                    <p className='text-md font-medium bg-green-600 w-max rounded-full px-3 '>{activeUsers}</p>
                </div>
            </div>

            <div className='w-full sm:w-1/2 h-full flex'>
                <div className='bg-[#202020] m-4 p-6 rounded-2xl w-full'>
                    <h1 className='text-2xl font-semibold'>Водители</h1>
                    <h1 className='text-lg mt-2 flex items-center'>Зарегестрировано <DotIcon
                        className='w-10 h-10 -ml-2 text-blue-500'/></h1>
                    <p className='text-md font-medium bg-blue-500 w-max rounded-full px-3'>...</p>
                    <h1 className='text-lg mt-4 flex items-center'> В сети <DotIcon
                        className='w-10 h-10 -ml-2 text-green-500'/></h1>
                    <p className='text-md font-medium bg-green-600 w-max rounded-full px-3 '>{activeDrivers}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className='w-full flex items-center justify-center gap-2 mt-4'>
            <h1 className='text-[#aaa]'>Подключаемся к серверу</h1> <Loader2
            className='animate-spin text-[#aaa] w-4 h-4'/>
        </div>
    )
}