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
    order_id: number,
    color: string,
    model: string,
    car_number: string,
    driver_phone: string,
    driver_name: string,
}

export const UserChatContext = createContext<IChatContext>(null!)
