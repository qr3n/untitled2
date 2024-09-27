import {PropsWithChildren} from "react";

interface IProps extends PropsWithChildren {
    title: string;
    description: string;
    color?: string
}

export const CreateOrderStepTemplate = (props: IProps) => {
    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <h1 className='text-3xl md:text-4xl font-bold'>{ props.title }</h1>
            <p className='mt-2 max-w-xs text-sm md:text-md' style={{color: props.color || '#8C8C8C'}}>{ props.description }</p>

            <div className='mt-8 flex h-full flex-col items-center justify-center'>
                { props.children }
            </div>
        </div>
    )
}