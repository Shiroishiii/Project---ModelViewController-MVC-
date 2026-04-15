interface UserModalProps {
    isOpen: boolean
    onClose: () => void
    onLogout: () => void
}

function UserModal({ isOpen, onClose, onLogout }: UserModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-(--cor-card-escuro) p-6 rounded-2xl w-64 flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >

                <h2 className="text-white text-lg font-semibold">
                    Usuário
                </h2>

                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                    Logout
                </button>

                <button
                    onClick={onClose}
                    className="text-(--texto-secundario)"
                >
                    Cancelar
                </button>

            </div>
        </div>
    )
}

export default UserModal