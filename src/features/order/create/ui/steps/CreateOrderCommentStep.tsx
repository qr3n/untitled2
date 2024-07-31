import {CreateOrderStepTemplate} from "@/features/order/create/ui/steps/CreateOrderStepTemplate";
import {useContext} from "react";
import {Context} from "@/features/order/create/model/context";


export const CreateOrderCommentStep = () => {
    const { comment, setComment } = useContext(Context)

    return (
        <CreateOrderStepTemplate title='Пожелания?' description='Пожалуйста, укажите суть задачи и детали заказа, если это необходимо'>
            <div
                className='flex flex-col mt-6 text-left w-screen px-12 sm:px-[25%] md:px-[30%] lg:px-[35%] xl:px-[35%]'>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className='h-48 bg-[#2A2A2A] resize-none w-full border-2 border-transparent p-3 rounded-xl outline-none focus:border-[#666] placeholder-[#888]'
                    placeholder='Я бы хотел(-а), чтобы с товаром обращались аккуратнее.'/>
            </div>


        </CreateOrderStepTemplate>
    )
}