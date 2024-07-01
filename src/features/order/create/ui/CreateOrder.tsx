import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {CreateOrderStep1} from "@/features/order/create/ui/steps/CreateOrderStep1";
import {CreateOrderStep2} from "@/features/order/create/ui/steps/CreateOrderStep2";
import {FaArrowRight} from "react-icons/fa";

export const CreateOrder = () => {
    return (
        <>
            <Carousel className="w-full -mt-12 sm:mt-0">
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