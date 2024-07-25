'use client';

import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const Providers = (props: PropsWithChildren) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            { props.children }
        </QueryClientProvider>
    )
}