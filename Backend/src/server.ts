import { prisma } from "./prisma/prisma";
import cors from "cors"
import express from "express"
import type { User } from "./generated/prisma/client";

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
    console.log(req)
    res.send('Hello World')
})

app.get('/cadastro', async (req, res) => {
    const userData = req.body as User 
    const newUser = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
    })
    return res.status(201).json({
        message:"Usuário criado com sucesso",
        data: newUser
    })
})

app.post('/login', async (req, res) => {
    const userData = req.body as Partial<User>
    const userExist = await prisma.user.findUnique({
        where: {
            email:  userData.email || ''
        }
    })

    const validCredentials = userData.password === userExist?.password

    if(userExist && validCredentials){
        return res.status(200).json({
            message:'Usuário logado com sucesso'
        })
    }

    return res.status(401).json({
        message:'Credenciais inválidas'
    })
})

//endpoints USER

app.get('/user', async (req, res) => {
    const users = await prisma.user.findMany()
    return res.json(users)
})

app.get('/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return res.status(200).json(user)
})

app.put('/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
    const dataUpdate = req.body as Omit<User, 'id'>

    const userUpdated = await prisma.user.update({
        data: {
            ...dataUpdate
        },
        where: {
            id: userId
        }
    })

    return res.status(200).json(userUpdated)
})
