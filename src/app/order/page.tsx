import { CreateOrder } from "@/features/order/create/ui/CreateOrder";


export default function OrderPage() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <CreateOrder/>
        </div>
    )
}