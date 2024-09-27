'use client';

import { jwtDecode } from "jwt-decode";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogOut, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { UserMenuLogout } from "@/app/usermenulogout";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {UserLogin} from "@/app/userlogin";
import {useState} from "react";
import {useCookies} from "next-client-cookies";

interface User {
    email: string
}

export const Usermenu = () => {
    const cookies = useCookies()
    const [isLogin, setIsLogin] = useState(!!cookies.get('token'))

    if (!isLogin) return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div
                        className='cursor-pointer sm:p-4 sm:backdrop-blur fixed top-4 right-4 gap-3 rounded-full flex items-center justify-center' style={{
                            background: 'rgba(30, 30, 30, .7)'
                    }}>
                        <Button className='bg-[#2174FFFF] hover:bg-[#0099ff] rounded-full font-bold'>Войти</Button>
                        <Button className='bg-white hover:bg-[#eee] text-black rounded-full font-bold hidden sm:block'>Зарегестироваться</Button>
                    </div>
                </DialogTrigger>

                <DialogContent className='rounded-none sm:!rounded-3xl bg-[#161616] h-[100dvh] sm:h-auto'>
                    <div>
                        <h1 className='font-semibold text-2xl text-center mt-4'>Добро пожаловать!</h1>
                        <UserLogin setIsLogin={setIsLogin}/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )

    const user = jwtDecode<User>(cookies.get('token')!)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className='cursor-pointer fixed top-4 right-4 bg-orange-500 shadow-2xl drop-shadow-2xl border-[#333] rounded-full w-10 h-10 flex items-center justify-center'>
                    <FaUser/>
                </div>
            </SheetTrigger>
            <SheetContent className='bg-[#151515] border-[#222]'>
                <SheetHeader>
                <SheetTitle className='text-white'>Меню</SheetTitle>
                    <SheetDescription className='text-[#aaa]'>
                        {user.email}
                    </SheetDescription>
                </SheetHeader>

                <Link href={'/profile'}>
                    <SheetClose asChild>
                        <div
                            className='w-full p-3 mt-8 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                            <UserIcon/>
                            Профиль
                        </div>
                    </SheetClose>
                </Link>

                <Link href={'/order'}>
                    <SheetClose asChild>
                        <div
                            className='w-full p-3 mt-4 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                            <PlusIcon/>
                            Создать заказ
                        </div>
                    </SheetClose>
                </Link>

                <UserMenuLogout setIsLogin={setIsLogin}/>

            </SheetContent>
        </Sheet>
    )
}