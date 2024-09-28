import bg from './bg.png'
import bgMobile from './bg-mobile.png'
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
      <>
          <Image
              src={bgMobile}
              alt={''}
              className='opacity-100 sm:opacity-0 fixed w-screen h-screen -z-50 object-cover object-bottom top-0 left-0'
          />

          <Image
              src={bg}
              alt={''}
              className='opacity-0 sm:opacity-100 fixed w-screen h-screen -z-50 object-cover object-bottom top-0 left-0'
          />

          <div
              className='mt-[25%] m-8 sm:m-16 md:m-20 lg:m-24 xl:m-28 flex flex-col items-center justify-center sm:block'
          >
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
                      from-[#2174FFFF]
                      to-[#00ffbb]
                      inline-block
                      text-transparent
                      bg-clip-text
                      '
                  >
                      СТАЛА ПРОЩЕ
                  </h1>
              </div>
              <Link href='/order'>
                  <Button
                      className='
                  mt-10
                  flex
                  items-center
                  justify-center
                  gap-3
                  -rotate-[7deg]
                  w-max
                  px-6
                  py-7
                  md:px-8
                  md:py-9
                  bg-white
                  text-[18px]
                  md:text-[22px]
                  xl:text-[24px]
                  font-bold
                  rounded-full
                  hover:-rotate-[5deg]
                  hover:scale-105
                  transition-all
                  bg-[#2174FFFF]
                  text-white
                  '
                  >
                      СДЕЛАТЬ ЗАКАЗ
                      <FaArrowRight className='w-6 h-6 text-white'/>
                  </Button>
              </Link>
          </div>
      </>
  );
}
