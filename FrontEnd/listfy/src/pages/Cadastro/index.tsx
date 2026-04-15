import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e: { preventDefault: () => void }) {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: senha
                })
            })

            const data = await res.json()

            if (res.ok) {
                alert('Conta criada!')
                navigate('/login')
            } else {
                alert(data.message || 'Erro ao cadastrar')
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex '>
            <div className=' flex w-1/2 h-screen bg-(--cor-preto)'>
                <img src="./assets/Logo_listify.png" alt="Logo Listfy" />
            </div>
            {/* body lado direito */}
            <div className='flex w-1/2  h-screen bg-(--cor-preto) justify-center items-center'>
                {/* componente do cadastro */}
                <form onSubmit={handleRegister} className="flex flex-col bg-(--cor-card-escuro)  
                rounded-2xl shadow-lg w-full max-w-md p-8 gap-6 border border-(--bordas-dark) ">

                    {/* Título */}
                    <h2 className="text-2xl font-bold text-center text-white">
                        Criar conta
                    </h2>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">

                        {/* Nome */}
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-(--texto-secundario)">Nome</label>
                            <input
                                type="text"
                                onChange={(e) => setNome(e.target.value)}
                                className="p-3 rounded-lg bg-(--cor-branco) border border-(--bordas-light)
                                focus:outline-none focus:ring-2 focus:ring-(--bottoms-and-links)
                                transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-(--texto-secundario)">Email</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 rounded-lg bg-(--cor-branco) border border-(--bordas-light)
                                focus:outline-none focus:ring-2 focus:ring-(--bottoms-and-links)
                                transition"
                            />
                        </div>

                        {/* Senha */}
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-(--texto-secundario)">Senha</label>
                            <input
                                type="password"
                                onChange={(e) => setSenha(e.target.value)}
                                className="p-3 rounded-lg bg-(--cor-branco) border border-(--bordas-light)
                                focus:outline-none focus:ring-2 focus:ring-(--bottoms-and-links)
                                transition"
                            />
                        </div>

                        {/* Link */}
                        <span className="text-sm text-center">
                            <a href="/login" className="text-(--bottoms-and-links) hover:underline">
                                Já tenho uma conta
                            </a>
                        </span>
                    </div>

                    {/* Botão */}
                    <button
                        type='submit'
                        className="p-3 rounded-lg font-semibold text-white 
                        bg-(--cor-vermelho-claro) hover:bg-(--cor-vermelho-escuro)
                        transition-all duration-200 active:scale-95"
                    >
                        Criar conta
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Cadastro