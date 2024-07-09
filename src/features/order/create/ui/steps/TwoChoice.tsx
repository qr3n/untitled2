import Image from "next/image";
import {useState} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import check from './assets/check.png'

interface IProps {
    firstTitle: string;
    firstDescription: string;
    firstImage: StaticImport;

    secondTitle: string;
    secondDescription: string;
    secondImage: StaticImport;

    onFirstVariantClick?: () => void,
    onSecondVariantClick?: () => void,
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
                <div className='flex relative items-center justify-center flex-col cursor-pointer min-h-full px-6 py-3 sm:pb-14'
                     style={selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => {
                         setSelected(0)
                         props.onFirstVariantClick && props.onFirstVariantClick()
                     }}>
                    <Image className='w-32 h-32 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover'
                           src={props.firstImage} alt={'select'} height={300} width={300}/>
                    <h1 className='text-xl md:text-2xl font-semibold mt-2'>{ props.firstTitle }</h1>
                    <p className='text-md md:text-lg text-[#9D9D9D]'>{ props.firstDescription }</p>
                    { selectedFirst && <Image src={check} alt={'check'} className='absolute top-1/2 -translate-y-1/2 right-10 sm:top-auto sm:bottom-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-0 sm:w-6' width={32}/> }
                </div>
                <div className='flex relative items-center justify-center flex-col cursor-pointer min-h-full px-6 py-3 sm:pb-14'
                     style={!selectedFirst ? selectedStyle : notSelectedStyle}
                     onClick={() => {
                         setSelected(1)
                         props.onSecondVariantClick && props.onSecondVariantClick()
                     }}
                >
                    <Image className='w-32 h-32 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover'
                           src={props.secondImage} alt={'select'} height={300} width={300}/>
                    <h1 className='text-xl md:text-2xl font-semibold mt-2'>{ props.secondTitle }</h1>
                    <p className='text-md md:text-lg text-[#9D9D9D]'>{ props.secondDescription }</p>
                    { !selectedFirst && <Image src={check} alt={'check'} className='absolute top-1/2 -translate-y-1/2 right-10 sm:top-auto sm:bottom-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-0 sm:w-6' width={32}/> }
                </div>
            </div>
        </>
    )
}