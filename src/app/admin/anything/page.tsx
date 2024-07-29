import Link from "next/link";
import {OrdersAnything} from "@/app/admin/anything/orders";
import {IAnythingOrder} from "@/app/admin/anything/model";

export default async function AnythingPage() {
    const data = await fetch('http://31.129.96.22/api/orders/all?admin_token=secret', { cache: 'no-cache' })
    const res: IAnythingOrder[] = await data.json()
    const filtered = res.filter(r => r.cargo === 'anything')

    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col items-center justify-center mt-8 gap-6'>
                <h1 className='text-2xl font-semibold'>Разные товары</h1>
                <div className='flex gap-6'>
                    <Link href='/admin/marketplace' className='rounded-full px-4 py-2'>Маркетплейсы</Link>
                    <Link href='/admin/anything' className='bg-white text-black font-semibold rounded-full px-4 py-2'>Разные товары</Link>
                </div>
            </div>
            { filtered.length != 0 && <OrdersAnything orders={filtered}/> }
            { filtered.length === 0 && <p className='absolute top-1/2 text-2xl -translate-y-1/2 text-[#999] left-1/2 -translate-x-1/2'>Пока нет заказов</p>}
        </div>
    )
}