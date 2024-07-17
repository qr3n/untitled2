import {createContext, Dispatch, SetStateAction} from "react";

interface IChatContext {
    chatOpen: boolean,
    setChatOpen: Dispatch<SetStateAction<boolean>>,
    orderId: number,
    setOrderId: Dispatch<SetStateAction<number>>,
}

export const UserChatContext = createContext<IChatContext>(null!)
