'use client';

import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {Loader2} from "lucide-react";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {useCookies} from "next-client-cookies";
import {useRouter} from "next/navigation";

interface IResponse {
    success: boolean,
    token: string
}

export const UserLogin = ({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<number>(0);
    const [code, setCode] = useState('')
    const cookies = useCookies()
    const router = useRouter()

    return (
        <form>
            { state === 0 ? (
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-8 w-full h-max bg-[#2A2A2A] border-2 border-transparent p-2 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='someemail@gmail.com'
                />
            ) : (
                <div className='flex justify-center w-full mt-4'>
                    <InputOTP maxLength={5} value={code} onChange={e => setCode(e)}>
                        <InputOTPGroup >
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            ) }

            <Button disabled={loading} className='bg-white w-full mt-8 text-black rounded-full font-bold'
                onClick={() => {
                    if (state === 0) {
                        setLoading(true)

                        axios.post(`https://postavan.com/api/email?email=${email}`).then(() => {
                            setLoading(false)
                            setState(1)
                        }).catch(() => {

                            toast({
                                title: "Упс! Что-то пошло не так...",
                                variant: 'destructive',
                                description: "Мы уже разбираемся, пожалуйста, подождите",
                            })
                        })
                    }

                    else {
                        setLoading(true)

                        axios.post<IResponse>(`https://postavan.com/api/login?code=${code}&email=${email}`, {}, {
                            withCredentials: true
                        }).then(r => {
                            if (r.data.success) {
                                cookies.set('token', r.data.token)
                                setIsLogin(true)
                                router.push('/profile')
                            }

                            else {
                                setLoading(false)
                                toast({
                                    title: "Вы ввели неверный код",
                                    variant: 'destructive',
                                    description: "Пожалуйста, проверье его еще раз.",
                                })
                            }
                        })
                    }
                }}
            >
                { loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                Войти
            </Button>
        </form>
    )
}