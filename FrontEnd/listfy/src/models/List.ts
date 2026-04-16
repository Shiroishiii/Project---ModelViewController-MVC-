import type { Product } from "./Product"

export interface List {
    id: number
    name: string
    products: Product[]
}

export function addList(prevLists, newList) {
    return [...prevLists, newList]
}

export function removeList(lists, id) {
    return lists.filter(lists => lists.id !== id)
}