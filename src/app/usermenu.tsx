import { cookies } from "next/headers";
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
import { AiFillDashboard } from "react-icons/ai";
import { GrDashboard } from "react-icons/gr";
import Link from "next/link";
import Avatar from "react-avatar";
import { FaUser } from "react-icons/fa";
import { redirect } from "next/navigation";
import { UserMenuLogout } from "@/app/usermenulogout";

interface User {
    email: string
}

export const Usermenu = () => {
    const token = cookies().get('token')

    if (!token) return <></>

    const user = jwtDecode<User>(token.value)


    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='cursor-pointer fixed top-4 right-4 bg-orange-400 rounded-full w-10 h-10 flex items-center justify-center'>
                    <FaUser />
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

                <UserMenuLogout/>

            </SheetContent>
        </Sheet>
    )
}