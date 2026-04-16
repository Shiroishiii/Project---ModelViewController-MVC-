
export async function createProduct(data, listId) {
    const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            listId
        })
    })
    return {
        ok: res.ok,
        data: await res.json()
    }
}