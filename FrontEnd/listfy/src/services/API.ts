const API = "http://localhost:3000"

export async function getLists() {
    const res = await fetch(`${API}/lists/list`)
    return res.json()
}

export async function createList(data: Record<string, unknown>) {
    const res = await fetch(`${API}/lists/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return res.json()
}

export async function createProduct(data: Record<string, unknown>) {
    const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return res.json()
}