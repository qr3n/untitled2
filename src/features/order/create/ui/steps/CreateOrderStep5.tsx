'use client';

import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Map, YMaps} from "@pbe/react-yandex-maps";
import {useContext} from "react";
import {Context} from "@/features/order/create/model/context";
import Script from "next/script";
import {AddressSuggestions} from "react-dadata";
import 'react-dadata/dist/react-dadata.css';

export const CreateOrderStep5 = () => {
    const { addrFrom, addrTo, setAddrFrom, setAddrTo } = useContext(Context)

    return (
        <CreateOrderStepTemplate title='Куда и откуда?' description='Условия для каждого варианта различаются'>
            <Script src='https://maps.googleapis.com/maps/js?key=YOUR_API_KEY_HERE&libraries=places'/>
            <div className='flex flex-col mt-4 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <h1 className='text-2xl mb-4 font-semibold'>На какой склад?</h1>
                <AddressSuggestions
                    filterFromBound='house'
                    token="dae305d1444a59cb68acd68b223f4080a84a6dc5"
                    delay={700}
                    suggestionClassName='suggestt_'
                    highlightClassName='suggest_highlight'
                    onChange={e => setAddrTo([e ? e.value : ''])}
                    inputProps={{
                        placeholder: 'г. Москва, Тверская...'
                    }}
                />

                <h1 className='text-2xl font-semibold mt-8 mb-4'>Откуда забрать?</h1>
                <AddressSuggestions
                    filterFromBound='house'
                    token="dae305d1444a59cb68acd68b223f4080a84a6dc5"
                    delay={700}
                    suggestionClassName='suggestt_'
                    highlightClassName='suggest_highlight'
                    onChange={e => setAddrFrom([e ? e.value : ''])}
                    inputProps={{
                        placeholder: 'г. Москва, Тверская...'
                    }}
                />
            </div>
        </CreateOrderStepTemplate>
    )
}
