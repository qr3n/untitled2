'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";


export const CreateOrderStep6 = () => {

    return (
        <CreateOrderStepTemplate title='Когда выполнить?' description='Условия для каждого варианта различаются'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl font-semibold'>Забрать</h1>
                <h1 className='text-2xl font-semibold'>Доставить</h1>
            </div>
        </CreateOrderStepTemplate>
)
}