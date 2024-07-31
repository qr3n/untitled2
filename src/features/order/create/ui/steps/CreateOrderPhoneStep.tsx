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
                <div className='w-full mt-4 relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 left-4'>+7</p>
                    <input
                        className='w-full pl-9 bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                        placeholder='9117629553' value={senderPhone}
                        onChange={e => setSenderPhone(e.target.value)}/>
                </div>

                <h1 className='font-semibold text-xl mt-8'>Номер получателя</h1>
                <div className='w-full mt-4 relative'>
                    <p className='absolute top-1/2 -translate-y-1/2 left-4'>+7</p>
                    <input
                        className='w-full pl-9 bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                        placeholder='9117629553' value={recipientPhone}
                        onChange={e => setRecipientPhone(e.target.value)}/>
                </div>


            </div>
        </CreateOrderStepTemplate>
    )
}