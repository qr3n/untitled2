'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import box from './assets/box.png'
import palette from './assets/palette.png'
import {TwoChoice} from "@/features/order/create/ui/steps/TwoChoice";


export const CreateOrderStep2 = () => {
    return (
        <CreateOrderStepTemplate title='Какая упаковка?' description='Условия для каждого варианта различаются'>
            <TwoChoice
                firstTitle={'Короб'}
                firstDescription={'До 23кг'}
                firstImage={box}
                secondTitle={'Палетта'}
                secondDescription={'До 24кг'}
                secondImage={palette}
            />
        </CreateOrderStepTemplate>
    )
}