import bg from './bg.png'
import bgMobile from './bg-mobile.png'
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import lamp from './lamp.png'
import box from './box.png'

export default function Home() {
  return (
      <>
          <Image
              src={bgMobile}
              alt={''}
              className='opacity-100 sm:opacity-0 absolute w-screen h-screen -z-50 object-cover object-bottom top-0 left-0'
          />

          <Image
              src={bg}
              alt={''}
              className='opacity-0 sm:opacity-100 absolute w-screen h-screen -z-50 object-cover object-bottom top-0 left-0'
          />

          <div
              className='mt-[30%] m-8 sm:m-16 md:m-20 lg:m-24 xl:m-28 flex flex-col items-center justify-center sm:block'
          >
              <div className='absolute top-10 sm:top-0 sm:relative flex w-max gap-4 items-center justify-center'>
                  <div className='flex items-center justify-center gap-1'>
                      <Image src={lamp} alt={'lamp'}/>
                      <h1 className='font-semibold text-[15px] sm:text-xl'>Ваша идея</h1>
                  </div>
                  <h1 className='text-[#999] text-2xl sm:text-3xl font-medium '>X</h1>
                  <div className='flex items-center justify-center gap-1'>
                      <Image src={box} alt={'box'}/>
                      <h1 className='font-semibold text-[15px] sm:text-xl'>Наша реализация</h1>
                  </div>
              </div>
              <div className='mt-4'>
                  <h1 className='text-[56px] md:text-[82px] lg:text-[96px] xl:text-[106px] font-bold'>ДОСТАВКА</h1>
                  <h1 className='
                      -mt-2
                      lg:-mt-6
                      xl:-mt-8
                      text-[40px]
                      md:text-[61px]
                      lg:text-[72px]
                      xl:text-[80px]
                      font-bold
                      bg-gradient-to-r
                      from-[#FF0000]
                      to-[#FFA63E]
                      inline-block
                      text-transparent
                      bg-clip-text
                      '
                  >
                      СТАЛА ПРОЩЕ
                  </h1>
              </div>
              <Link href='/order'>
                  <button
                      className='
                  mt-10
                  flex
                  items-center
                  justify-center
                  gap-3
                  -rotate-[7deg]
                  w-max
                  px-8
                  py-3.5
                  bg-white
                  text-[18px]
                  md:text-[22px]
                  xl:text-[24px]
                  font-bold
                  text-black
                  rounded-full
                  hover:-rotate-[5deg]
                  hover:scale-105
                  transition-all
                  '
                  >
                      СДЕЛАТЬ ЗАКАЗ
                      <FaArrowRight className='w-6 h-6 text-black'/>
                  </button>
              </Link>
          </div>
      </>
  );
}
