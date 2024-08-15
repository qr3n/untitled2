'use client';

import {useState} from "react";
import {useCookies} from "next-client-cookies";

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
                {children}
            </>
        )
    }
}