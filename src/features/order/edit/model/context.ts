import { createContext } from "react";
import { IEditOrderContext } from "@/features/order/edit/model/types";

export const EditOrderContext = createContext<IEditOrderContext>(null!)