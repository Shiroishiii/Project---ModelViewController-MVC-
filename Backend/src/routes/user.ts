import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = Router()

userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" })
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            data: newUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const userExist = await prisma.user.findUnique({
        where: { email }
    })

    if (!userExist || password !== userExist.password) {
        return res.status(401).json({
            message: 'Credenciais inválidas'
        })
    }

    return res.status(200).json({
        message: 'Usuário logado com sucesso'
    })
})

//endpoints USER

userRouter.get('/user', async (req, res) => {
    const users = await prisma.user.findMany()
    return res.json(users)
})

userRouter.get('/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return res.status(200).json(user)
})

userRouter.put('/user/:id', async (req, res) => {
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

userRouter.delete('/user/:id', async (req, res) => {
    const userId = Number(req.params.id)

    const userDeleted = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return res.status(200).json(userDeleted)
})