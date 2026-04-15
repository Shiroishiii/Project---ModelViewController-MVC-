import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if (res.ok) {
        alert('Login realizado com sucesso!')
        console.log(data)
        navigate('/home')
      } else {
        alert(data.message || 'Erro ao logar')
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex h-screen">

      {/* LADO ESQUERDO (FORM) */}
      <div className="w-1/2 flex justify-center items-center bg-(--cor-preto)">

        <form onSubmit={handleLogin} className="flex flex-col bg-(--cor-card-escuro)
                rounded-2xl shadow-lg w-full max-w-md p-8 gap-6 border border-(--bordas-dark)">

          {/* Título */}
          <h2 className="text-2xl font-bold text-center text-white">
            Entrar
          </h2>

          {/* Inputs */}
          <div className="flex flex-col gap-4">

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
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-lg bg-(--cor-branco) border border-(--bordas-light)
                                focus:outline-none focus:ring-2 focus:ring-(--bottoms-and-links)
                                transition"
              />
            </div>

            <div className="flex justify-between text-sm">

              <a href="#" className="text-(--bottoms-and-links) hover:underline">
                Não tenho uma conta
              </a>

              <a href="#" className="text-(--bottoms-and-links) hover:underline">
                Esqueceu a senha?
              </a>

            </div>

          </div>

          {/* Botão */}
          <button
            type='submit'
            className="p-3 rounded-lg font-semibold text-white
                        bg-(--cor-vermelho-claro) hover:bg-(--cor-vermelho-escuro)
                        transition-all duration-200 active:scale-95"
          >
            Entrar
          </button>

        </form>

      </div>

      {/* LADO DIREITO (IMAGEM) */}
      <div className="flex w-1/2 h-screen bg-(--cor-preto)">
        <img
          src="./assets/Logo_listify.png"
          alt="Logo Listify"
        />
      </div>

    </div>
  )
}

export default Login