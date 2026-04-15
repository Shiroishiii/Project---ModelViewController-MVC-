import { useState } from "react"

interface ListCardProps {
    title: string
    items: {
        id: number
        name: string
        quantity: number
        checked?: boolean
    }[]
    onToggleCheck?: (itemId: number, checked: boolean) => void
    onAddProduct?: () => void
}

function ListCard({
    title,
    items,
    onToggleCheck,
    onAddProduct
}: ListCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="
                bg-(--cor-card-escuro)
                p-4 rounded-2xl 
                border border-(--bordas-dark)
                flex flex-col gap-3
                transition-all duration-200
                hover:scale-[1.02]
                cursor-pointer
                relative
            "
        >
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">
                    {title}
                </h3>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onAddProduct?.()
                    }}
                    className="
                        text-white 
                        bg-(--cor-vermelho-claro)
                        w-7 h-7 rounded-lg 
                        flex items-center justify-center
                        hover:scale-110 transition
                    "
                >
                    +
                </button>
            </div>

            {/* PREVIEW */}
            {!isOpen && (
                <div className="flex flex-col gap-2">
                    {items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-(--texto-secundario) rounded"></div>
                            <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* EXPANDIDO */}
            {isOpen && (
                <div className="flex flex-col gap-3 mt-2">
                    {items.length === 0 && (
                        <p className="text-gray-400 text-sm">
                            Nenhum item
                        </p>
                    )}

                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* LEFT: CHECKBOX + NAME */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={Boolean(item.checked)}
                                    onChange={(e) =>
                                        onToggleCheck?.(item.id, e.target.checked)
                                    }
                                    className="w-5 h-5 accent-(--checkbox) cursor-pointer"
                                />

                                <span className="text-white text-sm">
                                    {item.name}
                                </span>
                            </div>

                            {/* QUANTIDADE */}
                            <span className="text-xs text-(--texto-secundario)">
                                x{item.quantity}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListCard