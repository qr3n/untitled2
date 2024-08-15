'use client';

import {useContext} from "react";
import {IoChatboxEllipses} from "react-icons/io5";
import {BaseChatContext} from "@/app/basechatmodel";

export const BaseChatButton = () => {
    const { setOpen, setWebsocket } = useContext(BaseChatContext);

    return (
        <button onClick={() => {
            setWebsocket(new WebSocket('wss://postavan.com/api/user/help'))
            setOpen(true)
        }} className='fixed bottom-7 right-7 bg-white shadow-2xl drop-shadow-2xl p-4 rounded-full border-white'>
            <IoChatboxEllipses className='text-black w-7 h-7'/>
        </button>
    )
}