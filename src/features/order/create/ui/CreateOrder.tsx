import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {CreateOrderStep1} from "@/features/order/create/ui/steps/CreateOrderStep1";

export const CreateOrder = () => {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                <CarouselItem>
                    <div className="p-1">
                        <CreateOrderStep1/>
                    </div>
                </CarouselItem>

                <CarouselItem>
                    <div className="p-1">
                        <CreateOrderStep1/>
                    </div>
                </CarouselItem>

                <CarouselItem>
                    <div className="p-1">
                        <CreateOrderStep1/>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}