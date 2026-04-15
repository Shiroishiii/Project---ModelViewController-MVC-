import { useState, useEffect } from 'react'
import CreateListModal from '../../components/CreateListModal'
import UserModal from '../../components/UserModal'
import ListCard from '../../components/ListCard'
import AddProductModal from '../../components/AddProductModal'
import { useNavigate } from 'react-router-dom'

interface Product {
    id: number
    name: string
    quantity: number
    category: string
    checked: boolean
}

interface List {
    id: number
    name: string
    products?: Product[]
}

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)
    const [search, setSearch] = useState("")

    const [selectedListId, setSelectedListId] = useState<number | null>(null)
    const [selectedListName, setSelectedListName] = useState("")

    const [lists, setLists] = useState<List[]>([])
    const navigate = useNavigate()

    const filteredLists = lists.filter((list) => {
        const matchList = list.name
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchProducts = list.products?.some((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        )

        return matchList || matchProducts
    })

    useEffect(() => {
        async function fetchLists() {
            const res = await fetch("http://localhost:3000/lists/list")
            const data = await res.json()
            setLists(data)
        }

        fetchLists()
    }, [])

    async function createProduct(data: {
        name: string
        quantity: number
        category: string
    }) {
        if (!selectedListId) {
            alert("Selecione uma lista primeiro")
            return
        }

        const res = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                listId: selectedListId
            })
        })

        const result = await res.json()

        if (!res.ok) {
            alert(result.message)
            return
        }

        setLists((prev) =>
            prev.map((list) =>
                list.id === selectedListId
                    ? {
                        ...list,
                        products: [
                            ...(list.products || []),
                            result
                        ]
                    }
                    : list
            )
        )

        setIsProductModalOpen(false)
        setSelectedListId(null)
        setSelectedListName("")
    }

    function handleToggleCheck(listId: number, itemId: number, checked: boolean) {
        setLists((prev) =>
            prev.map((list) => {
                if (list.id !== listId) return list

                return {
                    ...list,
                    products: (list.products || []).map((p) =>
                        p.id === itemId
                            ? { ...p, checked: checked }
                            : p
                    )
                }
            })
        )
    }

    async function createList(title: string) {
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

        const data = await res.json()

        if (res.ok) {
            setLists((prev) => [...prev, data])
        } else {
            alert(data.message)
        }
    }

    return (
        <div className="min-h-screen bg-(--cor-preto) p-6">

            {/* MODAIS */}
            <CreateListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={createList}
            />

            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onLogout={() => navigate('/login')}
            />

            <AddProductModal
                isOpen={isProductModalOpen}
                onClose={() => {
                    setIsProductModalOpen(false)
                    setSelectedListId(null)
                    setSelectedListName("")
                }}
                onCreate={createProduct}
                listName={selectedListName}
            />

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

                <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3 p-3 rounded-xl bg-(--cor-card-escuro)
                    border border-(--bordas-dark) text-white
                    focus:outline-none focus:ring-2 focus:ring-(--bottoms-and-links)"
                />

                <div
                    onClick={() => setIsUserModalOpen(true)}
                    className="w-10 h-10 rounded-full bg-(--cor-card-escuro)
                    flex items-center justify-center border border-(--bordas-dark)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="white" d="M12 2a5 5 0 1 0 0 10a5 5 0 1 0 0-10M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1" />
                    </svg>
                </div>
            </div>

            {/* LISTAS */}
            <div className="grid grid-cols-5 gap-6">

                {filteredLists.map((list) => (
                    <ListCard
                        key={list.id}
                        title={list.name}
                        items={list.products?.map(p => ({
                            id: p.id,
                            name: p.name,
                            quantity: p.quantity,
                            checked: p.checked
                        })) || []}
                        onAddProduct={() => {
                            setSelectedListId(list.id)
                            setSelectedListName(list.name)
                            setIsProductModalOpen(true)
                        }}
                        onToggleCheck={(itemId, checked) =>
                            handleToggleCheck(list.id, itemId, checked)
                        }
                    />
                ))}

                {/* BOTÃO ADICIONAR LISTA */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="bg-(--cor-card-escuro) rounded-2xl
                    border border-(--bordas-dark) flex items-center justify-center
                    hover:scale-105 transition cursor-pointer"
                >
                    <span className="text-4xl text-(--texto-secundario)">+</span>
                </div>

            </div>

        </div>
    )
}

export default Home