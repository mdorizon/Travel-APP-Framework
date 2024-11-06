import express from "express";
import cors from 'cors'
import CategoryController from "./routers/category/category.controller";
import CommentController from "./routers/comment/comment.controller";
import TravelController from "./routers/travel/travel.controller";
import loggerMiddle from "./middleware/logger.middle";

const app = express()
const port = 8000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))


app.use(loggerMiddle)
app.use("/comments", CommentController)
app.use("/categories", CategoryController)
app.use("/travels", TravelController)


app.listen(port, () => {
    console.log(`Travel-App listening on port ${port}`)
})