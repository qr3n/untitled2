'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {useContext} from "react";
import {Context} from "@/features/order/create/model/context";

export const CreateOrderPhoneStep = () => {
    const { recipientPhone, setRecipientPhone, senderPhone, setSenderPhone } = useContext(Context)

    return (
        <CreateOrderStepTemplate title='Как связаться?' description='Укажите номера телефонов'>
            <div
                className='flex flex-col mt-4 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='font-semibold text-xl'>Номер отправителя</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='+79117629553' value={senderPhone} onChange={e => setSenderPhone(e.target.value)}/>

                <h1 className='font-semibold text-xl mt-8'>Номер получателя</h1>
                <input
                    className='bg-[#2A2A2A] border-2 border-transparent mt-4 p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='+79117629553' value={recipientPhone} onChange={e => setRecipientPhone(e.target.value)}/>
            </div>
        </CreateOrderStepTemplate>
    )
}