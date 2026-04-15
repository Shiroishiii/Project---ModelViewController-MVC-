import { createProduct } from "../services/API"

export function useProducts() {

    async function addProduct(data: Record<string, unknown>, listId: number) {
        return createProduct({
            ...data,
            listId
        })
    }

    return { addProduct }
}