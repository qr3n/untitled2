'use client';

import {createContext, Dispatch, SetStateAction} from "react";

interface IBaseChatContext {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    websocket: WebSocket | null,
    setWebsocket: Dispatch<SetStateAction<WebSocket | null>>,
}

export const BaseChatContext = createContext<IBaseChatContext>(null!)
