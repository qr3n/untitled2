'use client';

import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {CreateOrderStep1} from "@/features/order/create/ui/steps/CreateOrderStep1";
import {CreateOrderStep2} from "@/features/order/create/ui/steps/CreateOrderStep2";
import {useEffect, useState} from "react";
import {CreateOrderStep3} from "@/features/order/create/ui/steps/CreateOrderStep3";

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
            <Carousel setApi={setApi} className="w-full">
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
                </CarouselContent>
            </Carousel>
            <div className='fixed bottom-0 px-8 w-full'>
                <button
                    onClick={() => api && api.scrollNext()}

                    className='

                w-full
                sm:w-max
                px-8
                py-3
                bg-white
                text-black
                rounded-full
                font-bold
            '
                >ПРОДОЛЖИТЬ
                </button>
            </div>
        </>
    )
}