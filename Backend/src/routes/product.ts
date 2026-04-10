import { Router } from "express";
import type { Products } from "../generated/prisma/client";
import { prisma } from "../prisma/prisma";


export const productRouter = Router()

productRouter.get ('/product', async (req, res) => {
    const productData = req.body as Products
    const newProduct = await prisma.products.create({
        data: {
            name: productData.name,
            quantity: productData.quantity,
            category: productData.category,
            listId: productData.listId
        }
    })
    res.status(201).json({
        message:'Produto criado',
        data:newProduct
    })
})

productRouter.get('/product', async (req, res) => {
    const allProducts = await prisma.list.findMany()
    return res.json(allProducts)
})

productRouter.get('/product/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const product = await prisma.products.findUnique({
        where: {
            id: productId
        }
    })
    return res.status(200).json(product)
})

productRouter.put('/product/:id', async (req, res) => {
    const productId = Number(req.params.id)
    const dataUpdate = req.body as Omit<Products, 'id'>
    const productUpdated = await prisma.products.update({
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
    const productDeleted = await prisma.products.delete({
        where: {
            id: productId
        }
    })
    res.status(200).json(productDeleted)
})