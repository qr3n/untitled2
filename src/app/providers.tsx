'use client';

import { PropsWithChildren, useEffect } from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { useCookies } from "next-client-cookies";

export const Providers = (props: PropsWithChildren) => {
    const cookies = useCookies()
    const token = cookies.get('token')

    useEffect(() => {
        if (token) {
            const ws = new WebSocket('wss://postavan.com/connection/user')

            return () => ws.close()
        }
    }, [token])

    return (
        <QueryClientProvider client={new QueryClient()}>
            { props.children }
        </QueryClientProvider>
    )
}
