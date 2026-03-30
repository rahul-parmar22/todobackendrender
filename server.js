import express from "express";
import cors from 'cors'
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv' 
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import  auth from './middleware/auth.js'
import adminOnly from "./middleware/adminOnly.js";
import adminRoutes from './routes/adminRoutes.js'


const app = express();
dotenv.config(); 
const port = process.env.PORT 

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}
))


connectDB(); 

app.get('/', (req,res)=>{
    res.send("hellow world....!")
});



app.use(express.json());  



app.use('/api/users',authRoutes);  
app.use('/api/todos',auth, todoRoutes); 
app.use('/api/admin', auth, adminOnly, adminRoutes )


app.listen(port, ()=>{ 
    console.log(`Example app listening on port ${port}`)  
});