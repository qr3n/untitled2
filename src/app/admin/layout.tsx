'use client';

import {useState} from "react";
import {useCookies} from "next-client-cookies";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { CgMenu } from "react-icons/cg";
import { GiHelp, GiInfo } from "react-icons/gi";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookies = useCookies()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [admintoken, setAdminToken] = useState<string | undefined>(cookies.get("admintoken"));

    if (!admintoken) {
        return (
            <div className='w-screen flex-col h-screen flex items-center justify-center'>
                <div className='flex flex-col gap-3 mt-12 min-w-full px-8 md:p-0 md:min-w-[380px]'>
                    <input placeholder='Логин' className='w-full resize-none bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]' onChange={e => setLogin(e.target.value)} value={login} type='email'/>
                    <input placeholder='Пароль' className='w-full resize-none bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]' onChange={e => setPassword(e.target.value)} value={password} type='password'/>
                    <button className='mt-4 rounded-full w-full px-4 py-2 bg-white text-black font-bold' onClick={() => {
                        if (login === 'admin' && password === 'admin') {
                            setAdminToken('secret')
                            cookies.set("admintoken", 'secret')
                        }
                    }}>
                        Войти
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <Sheet >
                    <SheetTrigger asChild>
                        <div className='p-2 rounded-lg cursor-pointer bg-[#222] fixed top-4 left-4 z-50'>
                            <CgMenu className='w-6 h-6'/>
                        </div>
                    </SheetTrigger>
                    <SheetContent side='left' className='bg-[#151515] border-[#222]'>
                        <SheetHeader>
                            <SheetTitle className='text-white'>Админ-панель</SheetTitle>
                            <SheetDescription className='text-[#aaa]'>
                            </SheetDescription>
                        </SheetHeader>

                        <Link href={'/admin'}>
                            <SheetClose asChild>
                                <div
                                    className='w-full p-3 mt-8 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                                    <UserIcon/>
                                    Заказы
                                </div>
                            </SheetClose>
                        </Link>

                        <Link href={'/admin/help'}>
                            <SheetClose asChild>
                                <div
                                    className='w-full p-3 mt-4 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                                    <GiHelp/>
                                    Чат с поддержкой
                                </div>
                            </SheetClose>
                        </Link>

                        <Link href={'/admin/users'}>
                            <SheetClose asChild>
                                <div
                                    className='w-full p-3 mt-4 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                                    <GiInfo/>
                                    Пользователи
                                </div>
                            </SheetClose>
                        </Link>
                    </SheetContent>
                </Sheet>
                {children}
            </>
        )
    }
}