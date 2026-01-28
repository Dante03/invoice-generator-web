export type ItemType = 'SERVICE' | 'PRODUCT'

export interface InvoiceItem {
    id: number
    name: string
    type: ItemType
    price: number
    quantity: number
    discount: number
}

export interface Totals {
    subtotal: number
    discount: number
    taxRate: number
    total: number
}
