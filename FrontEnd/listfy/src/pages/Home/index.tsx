import { useEffect, useState } from 'react'
import CreateListModal from '../../components/CreateListModal'
import UserModal from '../../components/UserModal'
import ListCard from '../../components/ListCard'
import AddProductModal from '../../components/AddProductModal'
import type { Product } from '../../models/Product'
import type { List } from '../../models/List'
import { useNavigate } from 'react-router-dom'
import { fetchLists, createList, deleteList } from '../../controllers/listController'
import { createProduct } from '../../controllers/productController'
import { toggleProduct, addProductToList } from '../../models/Product'
import { addList, removeList} from '../../models/List'

function Home() {
    const [isCreateListOpen, setIsCreateListOpen] = useState(false)
    const [isAddProductOpen, setisAddProductOpen] = useState(false)
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    // const [isProductModalOpen, setIsProductModalOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [lists, setLists] = useState<List[]>([])

    const [selectedListId, setSelectedListId] = useState<number | null>(null)
    const [selectedListName, setSelectedListName] = useState("")



    const navigate = useNavigate()

    useEffect(() => {
        async function loadLists() {
            const data = await fetchLists()
            setLists(data)
        }

        loadLists()
    }, [])

    async function handleCreatelist(title: string) {
        const data = await createList(title)

        setLists(prev => addList(prev, data))
        setIsCreateListOpen(false)
    }

    async function handleCreateProduct(productData: Product) {
        const result = await createProduct(productData, selectedListId)

        if (result.ok) {
            setLists(prev => addProductToList(prev, selectedListId, result.data))
            setisAddProductOpen(false)
            setSelectedListId(null)
            setSelectedListName("")
        }
    }

    function handleToggleCheck(listId, itemId, checked) {
        setLists(prev => toggleProduct(prev, listId, itemId, checked))
    }

    function handleOpenProductModal(listId, listName) {
        setSelectedListId(listId)
        setSelectedListName(listName)
        setisAddProductOpen(true)
    }

    function handleOpenUserModal() {
        setIsUserModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-(--cor-preto) p-6">

            {/* MODAIS */}
            <CreateListModal
                isOpen={isCreateListOpen}
                onClose={() => setIsCreateListOpen(false)}
                onCreate={handleCreatelist}
            />

            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onLogout={() => navigate('/login')}
            />

            <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => {
                    setisAddProductOpen(false)
                    setSelectedListId(null)
                    setSelectedListName("")
                }}
                onCreate={handleCreateProduct}
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
                    onClick={handleOpenUserModal}
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

                {lists.map((list) => (
                    <ListCard
                        key={list.id}
                        title={list.name}
                        items={list.products?.map((p: Product) => ({
                            id: p.id,
                            name: p.name,
                            quantity: p.quantity,
                            checked: p.checked
                        })) || []}
                        onAddProduct={() => { handleOpenProductModal(list.id, list.name)}}
                        onToggleCheck={(itemId, checked) =>
                            handleToggleCheck(list.id, itemId, checked)
                        }
                    />
                ))}

                {/* ADD LIST */}
                <div
                    onClick={() => setIsCreateListOpen(true)}
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