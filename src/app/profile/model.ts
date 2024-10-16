import {createContext, Dispatch, SetStateAction} from "react";

interface IChatContext {
    chatOpen: boolean,
    setChatOpen: Dispatch<SetStateAction<boolean>>,
    orderId: number,
    setOrderId: Dispatch<SetStateAction<number>>,
}

export interface IReview {
    order_id: number,
    text: string,
    stars: number
}

export interface IDriver {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    passport_number: string,
    passport_given: string,
    passport_given_date: string,
    driver_email: string,
    phone: string
}

export const UserChatContext = createContext<IChatContext>(null!)
