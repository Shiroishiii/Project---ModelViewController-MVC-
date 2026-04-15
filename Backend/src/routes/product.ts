import { Router } from "express";
import type { Product } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const productRouter = Router()

productRouter.post("/", async (req, res) => {
    const { name, quantity, category, listId } = req.body

    const product = await prisma.product.create({
        data: {
            name,
            quantity,
            category,
            listId: Number(listId)
        }
    })

    return res.status(201).json(product)
})

productRouter.get('/product', async (req, res) => {
    const allProducts = await prisma.product.findMany()
    return res.json(allProducts)
})

productRouter.get('/product/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    return res.status(200).json(product)
})

productRouter.put('/product/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const dataUpdate = req.body as Omit<Product, 'id'>
    const productUpdated = await prisma.product.update({
        data: {
            ...dataUpdate
        },
        where: {
            id: productId
        }
    })
    return res.status(200).json(productUpdated)
})

productRouter.delete('/product/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const productDeleted = await prisma.product.delete({
        where: {
            id: productId
        }
    })
    res.status(200).json(productDeleted)
})