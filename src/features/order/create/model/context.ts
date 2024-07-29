import {createContext, Dispatch, SetStateAction} from "react";

interface IContext {
    cargo: 'marketplace' | 'anything',
    setCargo: (v: 'marketplace' | 'anything') => void,
    warehouse: string,
    setWarehouse: (v: string) => void,
    whatToDeliver: string[],
    setWhatToDeliver:  Dispatch<SetStateAction<string[]>>,
    packing: 'box' | 'palette',
    setPacking: (v: 'box' | 'palette') => void,
    dimensions: string[]
    setDimensions: (v: string[]) => void,
    addrTo: string[],
    setAddrTo: (v: string[]) => void,
    addrFrom: string[],
    setAddrFrom: (v: string[]) => void,
    timeToTake: string,
    setTimeToTake: (v: string) => void,
    timeToDeliver: string,
    setTimeToDeliver: (v: string) => void,
    comment: string,
    setComment: (v: string) => void,

    canContinue: boolean,
    setCanContinue: (v: boolean) => void,
    emailStep: 1 | 2,
    setEmailSte: (v: 1 | 2) => void,
    email: string,
    setEmail: (v: string) => void,
    code: string,
    setCode: (v: string) => void,

    senderPhone: string,
    setSenderPhone: (v: string) => void,

    recipientPhone: string,
    setRecipientPhone: (v: string) => void,

    count: string,
    setCount: (v: string) => void
}

export const Context = createContext<IContext>(null!);
