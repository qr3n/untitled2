'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import items from './assets/items.png'
import palette from './assets/palette.png'
import {TwoChoice} from "@/features/order/create/ui/steps/TwoChoice";


export const CreateOrderStep2SecondVariant = () => {
    return (
        <CreateOrderStepTemplate title='Какая упаковка?' description='Условия для каждого варианта различаются'>
            <TwoChoice
                firstTitle={'Разные вещи'}
                firstDescription={'До 23кг'}
                firstImage={items}
                secondTitle={'Палетта'}
                secondDescription={'До 24кг'}
                secondImage={palette}
            />
        </CreateOrderStepTemplate>
    )
}