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

export const CreateOrder = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <>
            <Carousel setApi={setApi} className="mt-[-10rem] sm:mt-0 w-full">
                <CarouselContent>
                    <CarouselItem>
                        <div className="p-1">
                            <CreateOrderStep1/>
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="p-1">
                            <CreateOrderStep2/>
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="p-1">
                            <CreateOrderStep3/>
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="p-1">
                            <CreateOrderStep4/>
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="p-1">
                            <CreateOrderStep5/>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="p-1">
                            <CreateOrderStep6/>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className='fixed gap-4 bottom-8 px-8 w-full flex flex-col'>


                <button
                    onClick={() => api && api.scrollNext()}

                    className='
                    flex
                       items-center
                       justify-center
                     gap-2
                    w-full
                sm:w-max
                px-8
                py-2
                bg-white
                text-black
                rounded-full
                font-bold
            '
                >ПРОДОЛЖИТЬ
                    <FaArrowRight className='w-4 h-4 text-black'/>

                </button>
                <button
                    onClick={() => api && api.scrollPrev()}

                    className='
                    flex
                       items-center
                       justify-center
                     gap-2
                    w-full
                sm:w-max
                px-8
                py-2
                bg-gray-300
                text-black
                rounded-full
                font-bold
            '
                >
                    <FaArrowLeft className='w-4 h-4 text-black'/>
                    НАЗАД
                </button>

            </div>
        </>
    )
}