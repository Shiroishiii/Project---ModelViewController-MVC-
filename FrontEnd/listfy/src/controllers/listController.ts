
export async function fetchLists() {
    const res = await fetch("http://localhost:3000/lists/list")
    return res.json()
}


export async function createList(title: string) {
    const res = await fetch("http://localhost:3000/lists/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            userId: 1
        })
    })
    return res.json()
}

export async function deleteList(id: number) {
    const res = await fetch(`http://localhost:3000?lists/list/${id}`, {
        method:'DELETE'
    })
    return res.ok
}