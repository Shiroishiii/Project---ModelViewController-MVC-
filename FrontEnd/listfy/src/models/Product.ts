export interface Product {
    id: number
    name: string
    quantity: number
    category: string
    checked: boolean
}

export function toggleProduct(lists, listId, itemId, checked) {
    return lists.map((list) => {
        if (list.id !== listId) return list

        return {
            ...list,
            products: (list.products || []).map((p) => p.id === itemId ? {
                ...p,
                checked
            } : p)
        }
    })
}

export function addProductToList(lists, listId, product) {
    return lists.map((list) => list.id === listId ? {
        ...list,
        products: [...(list.products || []), product]
    } : list)
}