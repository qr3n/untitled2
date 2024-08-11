import {createContext, Dispatch, SetStateAction} from "react";

export interface IOrder {
    id: number
    email: string
    name: string,
    cargo: string,
    warehouse: 'Яндекс маркет' | 'Ozon' | 'AliExpress' | 'Lamoda' | 'Wildberriez',
    what_to_deliver: string,
    packing: 'box' | 'palette',
    dimensions: string,
    time_to_take: string,
    time_to_deliver: string,
    addr_to: string,
    addr_from: string,
    comment: string,
    status: 'active' | 'disabled',
    cost: number,
    count: string,
    sender_phone: string,
    recipient_phone: string,
    courier_status: string,
    tariff: 'day' | 'night',
}

interface IChatContext {
    chatOpen: boolean,
    setChatOpen: Dispatch<SetStateAction<boolean>>,
    orderId: number,
    setOrderId: Dispatch<SetStateAction<number>>,
}

export const ChatContext = createContext<IChatContext>(null!)
