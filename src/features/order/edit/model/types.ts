import { Dispatch, SetStateAction } from "react";
import { IOrder } from "@/app/admin/model";

export interface IEditOrderContext {
    setOpen: Dispatch<SetStateAction<boolean>>,
    order: IOrder | null,
    setOrder: Dispatch<SetStateAction<IOrder | null>>
}