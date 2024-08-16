'use client';

import {BaseAdminChat} from "@/app/admin/help/basechat";
import {useContext, useEffect, useState} from "react";
import {BaseChatContext} from "@/app/basechatmodel";

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

    return (
        <div className='flex gap-4 flex-col mt-24 px-8 sm:px-[5%] md:px-[7%] lg:px-[13%] xl:px-[20%] h-[calc(100dvh-100px)] overflow-y-auto'>
            <BaseAdminChat>
                { websockets && websockets.map(i => <ChatButton id={i.id} key={i.id}/>) }
            </BaseAdminChat>
        </div>
    )
}