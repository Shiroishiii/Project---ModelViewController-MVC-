import { useState, useEffect } from 'react'

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (data: {
        name: string
        quantity: number
        category: string
    }) => Promise<void>
    listName?: string
}

function AddProductModal({
    isOpen,
    onClose,
    onCreate,
    listName
}: AddProductModalProps) {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [category, setCategory] = useState("OTHER")
    const [loading, setLoading] = useState(false)

    // limpa estado sempre que abrir/fechar
    useEffect(() => {
        if (!isOpen) return

        setName('')
        setQuantity(1)
        setCategory("OTHER")
        setLoading(false)
    }, [isOpen])

    if (!isOpen) return null

    async function handleCreate() {
        if (!name.trim() || loading) return

        setLoading(true)

        try {
            await onCreate({
                name,
                quantity,
                category
            })

            onClose()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center"
            onClick={() => {
                if (!loading) onClose()
            }}
        >
            <div
                className="bg-(--cor-card-escuro) p-6 rounded-2xl w-[400px] flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >

                <h2 className="text-white text-xl font-bold">
                    Novo Produto
                </h2>

                {listName && (
                    <p className="text-gray-400 text-sm">
                        Lista: {listName}
                    </p>
                )}

                {/* NAME */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    disabled={loading}
                    className="p-3 rounded-lg bg-(--cor-branco) disabled:opacity-50"
                />

                {/* QUANTITY */}
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={loading}
                    className="p-3 rounded-lg bg-(--cor-branco) disabled:opacity-50"
                />

                {/* CATEGORY */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={loading}
                    className="p-3 rounded-lg bg-(--cor-branco) disabled:opacity-50"
                >
                    <option value="FOOD">Food</option>
                    <option value="DRINK">Drink</option>
                    <option value="CLEANING">Cleaning</option>
                    <option value="HYGIENE">Hygiene</option>
                    <option value="UTILITIES">Utilities</option>
                    <option value="OTHER">Other</option>
                </select>

                <div className="flex justify-end gap-2">

                    <button
                        onClick={() => {
                            if (!loading) onClose()
                        }}
                        disabled={loading}
                        className="text-gray-400 disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="bg-(--cor-vermelho-claro) px-4 py-2 rounded text-white disabled:opacity-60"
                    >
                        {loading ? "Criando..." : "Criar"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AddProductModal