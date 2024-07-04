'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import courier from './assets/courier.png'
import courierWithCar from './assets/courierwithcar.png'
import {TwoChoice} from "@/features/order/create/ui/steps/TwoChoice";
import {useContext} from "react";
import {Context} from "@/features/order/create/model/context";


export const CreateOrderStep1 = () => {
    const { setCargo } = useContext(Context)

    return (
        <CreateOrderStepTemplate title='Какой груз?' description='Условия для каждого варианта различаются'>
            <TwoChoice
                firstTitle={'Для маркетплейса'}
                firstDescription={'До 12кг'}
                firstImage={courierWithCar}
                secondTitle={'Разный товар'}
                secondDescription={'До 6кг'}
                secondImage={courier}
                onFirstVariantClick={() => setCargo('marketplace')}
                onSecondVariantClick={() => setCargo('anything')}
            />
        </CreateOrderStepTemplate>
    )
}