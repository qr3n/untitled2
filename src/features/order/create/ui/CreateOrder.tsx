'use client';

import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {CreateOrderStep1} from "@/features/order/create/ui/steps/CreateOrderStep1";
import {CreateOrderStep2} from "@/features/order/create/ui/steps/CreateOrderStep2";
import {createContext, useState} from "react";
import {CreateOrderStep3} from "@/features/order/create/ui/steps/CreateOrderStep3";
import {CreateOrderStep4} from "@/features/order/create/ui/steps/CreateOrderStep4";
import {CreateOrderStep5} from "@/features/order/create/ui/steps/CreateOrderStep5";
import {CreateOrderStep6} from "@/features/order/create/ui/steps/CreateOrderStep6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Context } from '../model/context'

export const CreateOrder = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [cargo, setCargo] = useState<'marketplace' | 'anything'>('marketplace')

    return (
        <Context.Provider value={{
            cargo,
            setCargo
        }}>
            <Carousel setApi={setApi} className="flex sm:mt-0 w-full h-screen">
                <CarouselContent className='h-full -mt-24'>
                    <CarouselItem className='h-full flex justify-center items-center'>
                        <div className="p-1">
                            <CreateOrderStep1/>
                        </div>
                    </CarouselItem>

                    <CarouselItem className='h-full flex justify-center items-center'>
                        <div className="p-1">
                            <CreateOrderStep2/>
                        </div>
                    </CarouselItem>

                    {
                        cargo === 'marketplace' && <CarouselItem className='h-full flex justify-center items-center'>
                            <div className="p-1">
                                <CreateOrderStep3/>
                            </div>
                        </CarouselItem>
                    }

                    <CarouselItem className='h-full flex justify-center items-center'>
                        <div className="p-1">
                            <CreateOrderStep4/>
                        </div>
                    </CarouselItem>

                    <CarouselItem className='h-full flex justify-center items-center'>
                        <div className="p-1">
                            <CreateOrderStep5/>
                        </div>
                    </CarouselItem>
                    <CarouselItem className='h-full flex justify-center items-center'>
                        <div className="p-1">
                            <CreateOrderStep6/>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className='fixed gap-4 bottom-8 px-8 w-full flex flex-col sm:px-[20%] md:px-[25%] lg:px-[30%] xl:px-[35%]'>
                <button
                    onClick={() => api && api.scrollNext()}

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
                >{ cargo }
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
                </button>

            </div>
        </Context.Provider>
    )
}