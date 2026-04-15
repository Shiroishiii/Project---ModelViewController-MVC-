import { useEffect, useState } from 'react'

interface CreateListModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (title: string) => Promise<void> | void
}

function CreateListModal({ isOpen, onClose, onCreate }: CreateListModalProps) {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    // reset automático quando abrir/fechar
    useEffect(() => {
        if (!isOpen) {
            setTitle('')
            setLoading(false)
        }
    }, [isOpen])

    if (!isOpen) return null

    async function handleCreate() {
        if (!title.trim()) return

        try {
            setLoading(true)

            await onCreate(title)

            setTitle('')
            onClose()

        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-(--cor-card-escuro) p-6 rounded-2xl w-full max-w-sm flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-white text-xl font-semibold">
                    Nova Lista
                </h2>

                <input
                    type="text"
                    placeholder="Nome da lista"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && title.trim() && !loading) {
                            handleCreate()
                        }
                    }}
                    className="p-3 rounded-lg bg-(--cor-branco) border border-(--bordas-light)
                    focus:outline-none focus:ring-2 focus:ring-(--bottoms-and-links)"
                />

                <div className="flex justify-end gap-2">

                    <button
                        onClick={onClose}
                        className="text-(--texto-secundario)"
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={!title.trim() || loading}
                        className={`px-4 py-2 rounded-lg text-white transition
                            ${title.trim() && !loading
                                ? 'bg-(--cor-vermelho-claro) hover:bg-(--cor-vermelho-escuro)'
                                : 'bg-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Criando...' : 'Criar'}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default CreateListModal