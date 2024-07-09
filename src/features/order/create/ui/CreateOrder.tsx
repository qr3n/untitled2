'use client';

import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {CreateOrderStep1} from "@/features/order/create/ui/steps/CreateOrderStep1";
import {CreateOrderStep2} from "@/features/order/create/ui/steps/CreateOrderStep2";
import {useEffect, useState} from "react";
import {CreateOrderStep3} from "@/features/order/create/ui/steps/CreateOrderStep3";
import {CreateOrderStep4} from "@/features/order/create/ui/steps/CreateOrderStep4";
import {CreateOrderStep5} from "@/features/order/create/ui/steps/CreateOrderStep5";
import {CreateOrderStep6} from "@/features/order/create/ui/steps/CreateOrderStep6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Context } from '../model/context'
import { CreateOrderStep7 } from "@/features/order/create/ui/steps/CreateOrderStep7";
import { Button } from "@/components/ui/button";
// @ts-ignore
import { useCookies } from 'next-client-cookies';
import axios from 'axios'
import {toast} from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import {CreateOrderStep5SecondVariant} from "@/features/order/create/ui/steps/CreateOrderStep5SecondVariant";
import {CreateOrderCommentStep} from "@/features/order/create/ui/steps/CreateOrderCommentStep";
import {CreateOrderGabaritsStep} from "@/features/order/create/ui/steps/CreateOrderGabaritsStep";

interface IResponse {
    success: boolean
}

const Buttons = ({ api, email, handleNext, emailStep }: { api: CarouselApi, email: string, handleNext: () => void, emailStep: 1 | 2 }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const cookies = useCookies()
    const account = cookies.get('token')

    useEffect(() => {
        if (!account) {
            if (!api) {
                return
            }

            if (!api.canScrollNext() && email === '') {
                setButtonDisabled(true)
            }

            else {
                setButtonDisabled(false)
            }

            api.on("select", () => {
                if (!api.canScrollNext() && email === '') {
                    setButtonDisabled(true)
                }

                else {
                    setButtonDisabled(false)
                }
            })
        }
    }, [api, email])

    return (
        <>
            <Button
                onClick={handleNext}
                disabled={buttonDisabled}
                className='
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    px-8
                    py-2
                    bg-white
                    text-black
                    rounded-full
                    font-bold
                    active:bg-gray-100
            '
            >
                ПРОДОЛЖИТЬ
                <FaArrowRight className='w-4 h-4 text-black'/>

            </Button>
            <Button
                onClick={() => api && api.scrollPrev()}
                disabled={emailStep === 2}
                className='
                    flex

                    justify-center
                    gap-2
                    w-full
                    px-8
                    py-2
                    border
                    border-[#666]
                    text-white
                    rounded-full
                    font-bold
                    active:bg-[#222]
            '
            >
                <FaArrowLeft className='w-4 h-4 text-white'/>
                НАЗАД
            </Button>
        </>
    )
}

const CreateOrderProvider = () => {
    return (
        <>

        </>
    )
}

export const CreateOrder = () => {
    const [cargo, setCargo] = useState<'marketplace' | 'anything'>('marketplace')
    const [warehouse, setWarehouse] = useState('Яндекс маркет')
    const [whatToDeliver, setWhatToDeliver] = useState<string[]>([])
    const [packing, setPacking] = useState<'box' | 'palette'>('box')
    const [dimensions, setDimensions] = useState<string[]>([])
    const [addrTo, setAddrTo] = useState('')
    const [addrFrom, setAddrFrom] = useState('')
    const [timeToTake, setTimeToTake] = useState('')
    const [timeToDeliver, setTimeToDeliver] = useState('')
    const [comment, setComment] = useState('')

    const [emailStep, setEmailSte] = useState<1 | 2>(1)
    const [api, setApi] = useState<CarouselApi>()
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [canContinue, setCanContinue] = useState(true)
    const router = useRouter()
    const cookies = useCookies()
    const account = cookies.get('token')


    const handleNext = () => {
        if (api) {
            if (api.canScrollNext() && emailStep === 1) {
                api.scrollNext()
            }

            else if (emailStep === 1) {
                if (!account) {
                    setEmailSte(2)

                    axios.post(`http://localhost:8000/email?email=${email}`).catch(() => {
                        toast({
                            title: "Упс! Что-то пошло не так...",
                            variant: 'destructive',
                            description: "Мы уже разбираемся, пожалуйста, подождите",
                        })
                    })
                }

                else {
                    axios.post(`http://localhost:8000/order`, {
                        cargo: cargo,
                        warehouse: warehouse,
                        what_to_deliver: whatToDeliver,
                        packing: packing,
                        dimensions: dimensions,
                        addr_to: addrTo,
                        addr_from: addrFrom,
                        time_to_take: timeToTake,
                        time_to_deliver: timeToDeliver,
                        comment: comment,
                    }, { withCredentials: true }).then(() => router.push('/profile'))
                }
            }

            else if (emailStep === 2) {
                if (!account) {
                    axios.post<IResponse>(`http://localhost:8000/login?code=${code}&email=${email}`, {}, {
                        withCredentials: true
                    })
                        .then(r => {
                            if (r.data.success) {
                                router.push('/profile')
                            }

                            else {
                                toast({
                                    title: "Вы ввели неверный код",
                                    variant: 'destructive',
                                    description: "Пожалуйста, проверье его еще раз.",
                                })
                            }
                        })
                }

                else {
                    router.push('/profile')
                }
            }
        }
    }

    return (
        <Context.Provider value={{
            cargo,
            setCargo,
            warehouse,
            setWarehouse,
            whatToDeliver,
            setWhatToDeliver,
            packing,
            setPacking,
            dimensions,
            setDimensions,
            addrTo,
            setAddrFrom,
            timeToTake,
            setTimeToTake,
            timeToDeliver,
            setTimeToDeliver,
            setAddrTo,
            addrFrom,
            comment,
            setComment,
            canContinue,
            setCanContinue,
            emailStep,
            setEmailSte,
            email,
            setEmail,
            code,
            setCode
        }}>
            <Carousel opts={{
                dragFree: false,
                watchDrag: false,
            }} setApi={setApi} className="flex sm:mt-0 w-full h-screen" draggable={false}>
                <CarouselContent className='h-full pt-12'>
                    <CarouselItem className='h-full flex justify-center'>
                        <div className="p-1">
                            <CreateOrderStep1/>
                        </div>
                    </CarouselItem>

                    {
                        cargo === 'marketplace' && <CarouselItem className='h-full flex justify-center'>
                            <div className="p-1">
                                <CreateOrderStep3/>
                            </div>
                        </CarouselItem>
                    }

                    {
                        cargo === 'marketplace' && <CarouselItem className='h-full flex justify-center'>
                            <div className="p-1">
                                <CreateOrderStep2/>
                            </div>
                        </CarouselItem>
                    }


                    {
                        cargo === 'anything' && <CarouselItem className='h-full flex justify-center'>
                            <div className="p-1">
                                <CreateOrderStep4/>
                            </div>
                        </CarouselItem>
                    }

                    <CarouselItem className='h-full flex justify-center'>
                        <div className="p-1">
                            <CreateOrderGabaritsStep/>
                        </div>
                    </CarouselItem>

                    <CarouselItem className='h-full flex justify-center'>
                        <div className="p-1">
                            { cargo === 'marketplace' ? <CreateOrderStep5/> : <CreateOrderStep5SecondVariant/> }
                        </div>
                    </CarouselItem>
                    <CarouselItem className='h-full flex justify-center'>
                        <div className="p-1">
                            <CreateOrderStep6/>
                        </div>
                    </CarouselItem>

                    <CarouselItem className='h-full flex justify-center'>
                        <div className="p-1">
                            <CreateOrderCommentStep/>
                        </div>
                    </CarouselItem>

                    { !account && <CarouselItem className='h-full flex justify-center'>
                        <div className="p-1">
                            <CreateOrderStep7/>
                        </div>
                    </CarouselItem> }
                </CarouselContent>
            </Carousel>
            <div className='fixed gap-4 bottom-2 sm:bottom-8 px-8 w-full flex flex-col sm:px-[20%] md:px-[25%] lg:px-[30%] xl:px-[35%]'>
                <Buttons api={api} email={email} handleNext={handleNext} emailStep={emailStep}/>
            </div>

        </Context.Provider>
    )
}