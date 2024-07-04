import {createContext} from "react";

interface IContext {
    cargo: 'marketplace' | 'anything',
    setCargo: (v: 'marketplace' | 'anything') => void
}

export const Context = createContext<IContext>(null!);
