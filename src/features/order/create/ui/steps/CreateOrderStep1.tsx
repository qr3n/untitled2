import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import courier from './assets/courier.png'
import courierWithCar from './assets/courierwithcar.png'
import Image from "next/image";


export const CreateOrderStep1 = () => {
    return (
        <CreateOrderStepTemplate title='Какой груз?' description='Условия для каждого варианта различаются'>
            <div className='flex flex-col sm:flex-row items-center justify-center text-center'>
                <div>
                    <Image src={courierWithCar} alt={'courier'} width={300}/>
                    <h1 className='text-2xl font-semibold'>Для маркетплейса</h1>
                    <p className='text-lg text-[#9D9D9D]'>До 12кг</p>
                </div>
                <div>
                    <Image src={courier} alt={'courier'} width={300}/>
                    <h1 className='text-2xl font-semibold'>Разный товар</h1>
                    <p className='text-lg text-[#9D9D9D]'>До 12кг</p>
                </div>
            </div>
        </CreateOrderStepTemplate>
    )
}