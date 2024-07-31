'use client';

import { SheetClose } from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export const UserMenuLogout = () => {
    const cookies = useCookies()
    const router = useRouter()

    return (
        <SheetClose asChild>
            <div
                onClick={() => {
                    cookies.remove("token");
                    router.push('/')
                }}
                className='w-full p-3 mt-4 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                <LogOut/>
                Выйти
            </div>
        </SheetClose>
    )
}