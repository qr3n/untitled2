export interface IMarketplaceOrder {
    id: number
    email: string
    name: string,
    cargo: string,
    warehouse: 'Яндекс маркет' | 'Ozon' | 'AliExpress' | 'Lamoda' | 'Wildberriez',
    what_to_deliver: string,
    packing: 'box' | 'palette',
    dimensions: string,
    time_to_take: string,
    time_to_deliver: string,
    addr_to: string,
    addr_from: string
}
