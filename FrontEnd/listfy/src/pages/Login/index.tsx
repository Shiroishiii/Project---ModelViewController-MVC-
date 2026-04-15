
function Login() {
  return (
    <div className='flex '>
      {/* body lado esquerdo */}
      <div className='flex w-1/2  h-screen bg-(--cor-branco) justify-center items-center'>
        {/* componente do Login */}
        <div className='flex flex-col border bg-(--cor-card-branco) rounded justify-center items-center h-auto w-full max-w-md p-6 gap-4 overflow-hidden'>
          <h1 className='text-2xl'>Login</h1>
          {/* div de imputs  */}
          <div className='w-full flex flex-col gap-3'>


            <div className='flex flex-col'>
              <label className='mb-1'>Email</label>
              <input className='bg-(--cor-branco) border p-2 rounded w-full' type="email" />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1'>Senha</label>
              <input className='bg-(--cor-branco) border p-2 rounded w-full' type="password" />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1'>Confirmar Senha</label>
              <input className='bg-(--cor-branco) border p-2 rounded w-full' type="password" />
            </div>

          </div>

          <button className='border p-2 rounded w-full bg-blue-500 text-white hover:bg-blue-600 transition'>
            Enviar
          </button>

        </div>

      </div>

      <div className=' flex w-1/2 h-screen bg-(--cor-vermelho-escuro)'>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Login