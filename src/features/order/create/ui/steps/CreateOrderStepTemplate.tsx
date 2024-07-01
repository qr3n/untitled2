import {PropsWithChildren} from "react";

interface IProps extends PropsWithChildren {
    title: string;
    description: string;
}

export const CreateOrderStepTemplate = (props: IProps) => {
    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <h1 className='text-4xl font-bold'>{ props.title }</h1>
            <p className='text-[#8C8C8C] mt-2 max-w-xs'>{ props.description }</p>

            <div className='mt-8 flex flex-col items-center justify-center'>
                { props.children }
            </div>
        </div>
    )
}