import {createContext} from "react";

interface IContext {
    cargo: 'marketplace' | 'anything',
    setCargo: (v: 'marketplace' | 'anything') => void,
    canContinue: boolean,
    setCanContinue: (v: boolean) => void,
    emailStep: 1 | 2,
    setEmailSte: (v: 1 | 2) => void,
}

export const Context = createContext<IContext>(null!);
