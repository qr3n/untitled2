'use client';

import {BaseAdminChat} from "@/app/admin/help/basechat";
import {useContext, useEffect, useState} from "react";
import {BaseChatContext} from "@/app/basechatmodel";
import Image from "next/image";
import { bgDesktop, bgMobile, dolphin } from "@/shared/assets";

interface IWebsocket {
    id: number
}

interface IMessage {
    type_: 'add' | 'remove' | 'init',
    websockets: IWebsocket[],
    id: number,
}

const ChatButton = ({ id }: { id: number }) => {
    const { setOpen, setWebsocket } = useContext(BaseChatContext);

    return (
        <div onClick={() => {
            setWebsocket(new WebSocket(`wss://postavan.com/api/admin/help?id=${id}`))
            setOpen(true)
        }} className='px-6 py-4 bg-[#222] rounded-2xl hover:bg-[#333] cursor-pointer'>
            <h1 className='font-semibold text-xl'>Чат #{id}</h1>
            <h1 className='text-[#999] text-sm'>Новых сообщений нет</h1>
        </div>
    )
}

export default function HelpPage() {
    const [websockets, setWebsockets] = useState<IWebsocket[]>([])

    useEffect(() => {
        const websocket = new WebSocket('wss://postavan.com/api/helpsockets')

        websocket.onmessage = (m) => {
            const data: IMessage = JSON.parse(m.data)

            switch (data.type_) {
                case "init":
                    setWebsockets(data.websockets)

                    break

                case "add":
                    setWebsockets(prev => [...prev, { id: data.id }])

                    break

                case "remove":
                    setWebsockets(prev => prev.filter(w => w.id !== data.id))

                    break
            }
        }
    }, []);

    return websockets.length > 0 ? (
        <div className='flex gap-4 flex-col mt-24 px-8 sm:px-[5%] md:px-[7%] lg:px-[13%] xl:px-[20%] h-[calc(100dvh-100px)] overflow-y-auto'>
            <BaseAdminChat>
                { websockets && websockets.map(i => <ChatButton id={i.id} key={i.id}/>) }
            </BaseAdminChat>
        </div>
    ) : (
        <div
            className='w-full h-[100dvh] flex relative items-center flex-col text-center justify-center'>
            <Image placeholder="blur" src={bgMobile}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden'
                   alt='bg'/>
            <Image placeholder="blur" src={bgDesktop}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block'
                   alt='bg'/>
            <div
                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>
            <div className='h-full w-full flex items-center justify-center flex-col'>
                <Image priority src={dolphin} width={350} height={350} alt='test'
                       className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                    Чатов пока нет.
                </h1>
                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                    Ждем, пока кто-то откроект чат
                </h2>
            </div>
        </div>
    )
}