import type { Product } from "./Product"

export interface List {
    id: number
    name: string
    products: Product[]
}