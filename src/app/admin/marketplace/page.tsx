import {Orders} from "@/app/admin/marketplace/orders";
import {IMarketplaceOrder} from "./model";
import Link from "next/link";


export default async function MarketplacePage() {
    const data = await fetch('http://31.129.96.22/api/orders/all?admin_token=secret', { cache: 'no-cache' })
    const res: IMarketplaceOrder[] = await data.json()
    const filtered = res.filter(r => r.cargo === 'marketplace')

    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col items-center justify-center mt-8 gap-6'>
                <h1 className='text-2xl font-semibold'>Товары для маркетплейсов</h1>
                <div className='flex gap-6'>
                    <Link href='/admin/marketplace' className='bg-white rounded-full px-4 py-2 text-black font-semibold'>Маркетплейсы</Link>
                    <Link href='/admin/anything' className='rounded-full px-4 py-2'>Разные товары</Link>
                </div>
            </div>
            { filtered.length != 0 && <Orders orders={filtered}/> }
            { filtered.length === 0 && <p className='absolute top-1/2 text-2xl -translate-y-1/2 text-[#999] left-1/2 -translate-x-1/2'>Пока нет заказов</p>}
        </div>
    )
}
