'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useContext } from "react";
import {Context} from "@/features/order/create/model/context";

export const CreateOrderStep7 = () => {
    const { emailStep, email, setEmail, setCode, code } = useContext(Context)

    return (
        <CreateOrderStepTemplate title={ emailStep === 1 ? 'Ваш email?' : 'Введите код' } description='Мы войдем в уже существующий аккаунт или создадим новый'>
            <div
                className='flex flex-col items-center justify-center mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                {
                    emailStep === 1 && <input
                        className='bg-[#2A2A2A] border-2 border-transparent p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                        placeholder='someemail@email.com' value={email} onChange={e => setEmail(e.target.value)}/>
                }

                {
                    emailStep === 2 && <InputOTP maxLength={5} value={code} onChange={e => setCode(e)}>
                        <InputOTPGroup >
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                        </InputOTPGroup>
                    </InputOTP>
                }
            </div>
        </CreateOrderStepTemplate>
    )
}