import { Router } from "express";
import type { List } from "../generated/prisma/client";
import { prisma } from "../prisma/prisma";


export const listRouter = Router()

listRouter.get('list', async (req, res) => {
    const listData = req.body as List
    const newList = await prisma.list.create({
        data: {
            name: listData.name,
            userId: listData.userId
        }
    })
    res.status(201).json({
        message:'Lista criada',
        data:newList
    })
})

listRouter.get('/list', async (req, res) => {
    const lists = await prisma.list.findMany()
    return res.json(lists)
})

listRouter.get('/list/:id', async (req, res) => {
    const listId = Number(req.params.id)
    const list = await prisma.list.findUnique({
        where: {
            id: listId
        }
    })

    return res.status(200).json(list)
})

listRouter.put('/list/:id', async (req, res) => {
    const listId = Number(req.params.id)
    const dataUpdate = req.body as Omit<List, 'id'>

    const listUpdated = await prisma.list.update({
        data: {
            ...dataUpdate
        },
        where: {
            id: listId
        }
    })

    return res.status(200).json(listUpdated)
})

listRouter.delete('/list/:id', async (req, res) => {
    const listId = Number(req.params.id)

    const listDeleted = await prisma.list.delete({
        where: {
            id: listId
        }
    })

    return res.status(200).json(listDeleted)
})