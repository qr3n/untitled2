import Image from "next/image";
import courierWithCar from "@/features/order/create/ui/steps/assets/courierwithcar.png";
import courier from "@/features/order/create/ui/steps/assets/courier.png";
import {useState} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

interface IProps {
    firstTitle: string;
    firstDescription: string;
    firstImage: StaticImport;

    secondTitle: string;
    secondDescription: string;
    secondImage: StaticImport;
}

export const TwoChoice = (props: IProps) => {
    const [selected, setSelected] = useState<number>(0);
    const selectedFirst = selected === 0

    const notSelectedStyle = {
        backgroundColor: 'transparent',
        border: '2px solid transparent',
        borderRadius: '24px'
    }

    const selectedStyle = {
        backgroundColor: 'rgba(184, 255, 166, .1)',
        border: '2px solid rgba(0, 255, 71, 0.5)',
        borderRadius: '24px'
    }


    return (
        <>
            <div className='flex flex-col sm:flex-row text-center w-screen px-8 sm:p-0 sm:w-auto'>
                <div className='flex items-center justify-center flex-col cursor-pointer min-h-full p-6 transition-all'
                     style={selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => setSelected(0)
                     }>
                    <Image className='w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover'
                           src={props.firstImage} alt={'courier'} height={300} width={300}/>
                    <h1 className='text-xl md:text-2xl font-semibold mt-4'>{ props.firstTitle }</h1>
                    <p className='text-md md:text-lg text-[#9D9D9D]'>{ props.firstDescription }</p>
                </div>
                <div className='flex items-center justify-center flex-col cursor-pointer min-h-full p-6 transition-all'
                     style={!selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => setSelected(1)}
                >
                    <Image className='w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover'
                           src={props.secondImage} alt={'courier'} height={300} width={300}/>
                    <h1 className='text-xl md:text-2xl font-semibold mt-4'>{ props.secondTitle }</h1>
                    <p className='text-md md:text-lg text-[#9D9D9D]'>{ props.secondDescription }</p>
                </div>
            </div>
        </>
    )
}