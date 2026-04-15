import { useEffect, useState } from "react"
import type { List } from "../models/List"
import { getLists, createList } from "../services/API"

export function useLists() {
    const [lists, setLists] = useState<List[]>([])

    async function load() {
        const data = await getLists()
        setLists(data)
    }

    useEffect(() => {
        let mounted = true
        
        ;(async () => {
            if (mounted) {
                await load()
            }
        })()
        
        return () => {
            mounted = false
        }
    }, [])

    async function addList(title: string) {
        const newList = await createList({
            title,
            userId: 1
        })

        setLists((prev) => [...prev, newList])
    }

    return {
        lists,
        setLists,
        addList,
        load
    }
}