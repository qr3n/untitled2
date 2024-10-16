import {createContext, Dispatch, SetStateAction} from "react";

export interface IOrder {
    id: number
    email: string
    name: string,
    cargo: string,
    warehouse: 'Яндекс маркет' | 'Ozon' | 'AliExpress' | 'Lamoda' | 'Wildberries',
    what_to_deliver: string,
    packing: 'box' | 'palette',
    dimensions: string,
    time_to_take: string,
    time_to_deliver: string,
    addr_to: string,
    addr_from: string,
    comment: string,
    status: 'active' | 'disabled' | 'canceled',
    cost: number,
    count: string,
    sender_phone: string,
    recipient_phone: string,
    courier_status: string,
    tariff: 'day' | 'night',
    driver_email: string,
}

export interface ICar {
    id: number,
    color: string,
    model: string,
    number: string,
    driver_email: string
}

export interface IDriver {
    name: string
    surname: string
    patronymic: string
    passport_number: string
    passport_given: string
    passport_given_date: string
    driver_email: string,
    phone: string
}

interface IChatContext {
    chatOpen: boolean,
    setChatOpen: Dispatch<SetStateAction<boolean>>,
    orderId: number,
    setOrderId: Dispatch<SetStateAction<number>>,
}

export const ChatContext = createContext<IChatContext>(null!)
