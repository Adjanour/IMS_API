import  express from "express"
import  {connectDB} from "./db.js"
import router from "./routes.js"
import productRouter from "./routes/productRoutes.js"
connectDB()

const app = express()


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

//register middlewares

//needed to appropriately parse the req object body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//add routes
app.use("/api/v1",router,productRouter)
app.all("*",(_,res)=>{
    res.status(404).json({error:"Route not found"})
})
