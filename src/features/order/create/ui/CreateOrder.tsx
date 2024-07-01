'use client';

import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {CreateOrderStep1} from "@/features/order/create/ui/steps/CreateOrderStep1";
import {CreateOrderStep2} from "@/features/order/create/ui/steps/CreateOrderStep2";
import {useEffect, useState} from "react";

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
            <Carousel setApi={setApi} className="w-full -mt-12 sm:mt-0">
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
                            <CreateOrderStep1/>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className='absolute bottom-4 p-8 w-full'>
                <button
                    onClick={() => api && api.scrollNext()}

                    className='

                w-full
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