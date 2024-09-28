'use client';

import { IOrder } from "@/app/admin/model";
import { CiEdit } from "react-icons/ci";
import { useContext } from "react";
import { EditOrderContext } from "@/features/order/edit/model/context";

export const EditOrder = ({order}: { order: IOrder }) => {
    const { setOpen, setOrder } = useContext(EditOrderContext)

    return (
        <>
            {((!order.courier_status || order.courier_status === 'Поиск курьера' || order.courier_status === 'Курьер назначен') && order.status !== 'disabled') &&
                <div onClick={() => {
                    setOrder(order)
                    setOpen(true)
                }} className='z-20 p-2 rounded-md bg-[#444] hover:bg-[#555]'>
                    <CiEdit/>
                </div>
            }
        </>
    )
}