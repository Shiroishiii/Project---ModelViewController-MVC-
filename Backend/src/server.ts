import cors from "cors"
import express from "express"
import { userRouter } from "./routes/user";
import { listRouter } from "./routes/list";
import { productRouter } from "./routes/product";

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
    res.send('API LISTIFY rodando 🚀')
})

app.use('/users', userRouter)
app.use('/lists', listRouter)
app.use('/products', productRouter)

app.listen (port, () => {
    console.log("Servidor tá de pé :Q")
})