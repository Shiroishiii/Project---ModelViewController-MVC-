import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listRouter = Router();


// CREATE LIST
listRouter.post("/list", async (req, res) => {
    const { title, userId } = req.body;

    if (!title || !userId) {
        return res.status(400).json({ message: "title e userId obrigatórios" });
    }

    try {
        const newList = await prisma.list.create({
            data: {
                name: title,
                userId: Number(userId)
            }
        });

        return res.status(201).json({
            message: "Lista criada",
            data: newList
        });

    } catch (error) {
        return res.status(500).json(error);
    }
});


// GET ALL
listRouter.get("/list", async (req, res) => {
    const lists = await prisma.list.findMany({
        include: {
            products: true
        }
    });
    return res.json(lists);
});


// GET BY ID
listRouter.get("/list/:id", async (req, res) => {
    const listId = Number(req.params.id);

    const list = await prisma.list.findUnique({
        where: { id: listId },
        include: {
            products: true
        }
    });

    return res.json(list);
});


// UPDATE
listRouter.put("/list/:id", async (req, res) => {
    const listId = Number(req.params.id);

    const updated = await prisma.list.update({
        where: { id: listId },
        data: req.body
    });

    return res.json(updated);
});


// DELETE
listRouter.delete("/list/:id", async (req, res) => {
    const listId = Number(req.params.id);

    const deleted = await prisma.list.delete({
        where: { id: listId }
    });

    return res.json(deleted);
});