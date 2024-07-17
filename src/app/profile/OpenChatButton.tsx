'use client';

import {useContext} from "react";
import {UserChatContext} from "@/app/profile/model";
import {BsChat} from "react-icons/bs";

export const OpenChatButton = ({ orderId }: { orderId: number }) => {
    const { setOrderId, setChatOpen } = useContext(UserChatContext)

    return (
        <div onClick={() => {
            setOrderId(orderId)
            setChatOpen(true)
        }} className='z-20 p-2 rounded-md bg-[#444] hover:bg-[#555]'>
            <BsChat/>
        </div>
    )
}