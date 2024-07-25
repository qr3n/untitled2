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

export const UserChatContext = createContext<IChatContext>(null!)
