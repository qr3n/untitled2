'use client';

import {FaArrowRight} from "react-icons/fa";
import {useState} from "react";

export default function AuthPage() {
    const [variant, setVariant] = useState<'login' | 'signup'>('login');

    return (
        <div className='flex w-screen h-screen justify-center items-center flex-col'>
            <div className='flex items-center justify-center w-[400px] flex-col'>
                <h1 className='text-4xl font-bold'>{ variant === 'login' ? 'Войти' : 'Регистрация'}</h1>
                <input
                    className='mt-8 bg-[#2A2A2A] w-full border-2 border-transparent p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Телефон или email'/>
                <input
                    className='bg-[#2A2A2A] w-full border-2 border-transparent mt-4 p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Пароль'/>

                <button
                    className='
                    flex
                       items-center
                       justify-center
                     gap-2
                    w-full
                    mt-8
                px-8
                py-2
                bg-white
                text-black
                rounded-full
                font-bold
                active:bg-gray-100
            '
                >
                    { variant === 'login' ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ' }
                    <FaArrowRight className='w-4 h-4 text-black'/>

                </button>
                <div onClick={() => setVariant(variant === 'login' ? 'signup' : 'login')} className='text-[#999] mt-6 text-lg flex items-center justify-center gap-1'>
                    { variant === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?' }
                    <p className='text-orange-500 cursor-pointer'>{ variant === 'login' ? 'Регистрация' : 'Войти' }</p>
                </div>
            </div>
        </div>
    )
}