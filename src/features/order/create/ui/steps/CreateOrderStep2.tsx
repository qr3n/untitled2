'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import box from './assets/box.png'
import palette from './assets/palette.png'
import {TwoChoice} from "@/features/order/create/ui/steps/TwoChoice";
import {useContext} from "react";
import {Context} from "@/features/order/create/model/context";


export const CreateOrderStep2 = () => {
    const { setPacking } = useContext(Context)

    return (
        <CreateOrderStepTemplate title='Какая упаковка?' description='Условия для каждого варианта различаются'>
            <TwoChoice
                firstTitle={'Короб'}
                firstDescription={'до 25кг'}
                firstImage={box}
                secondTitle={'Палетта'}
                secondDescription={'до 25кг'}
                secondImage={palette}
                onFirstVariantClick={() => setPacking('box')}
                onSecondVariantClick={() => setPacking('palette')}
            />
        </CreateOrderStepTemplate>
    )
}