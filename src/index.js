import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({path:'./env'})

const port = process.env.PORT || 8000
connectDB().then(()=>{
    app.on('error',(error)=>{
        console.log(`ERR : ${error}`)
    })
    app.listen(port,()=>{
        console.log(`App started on port: ${port}`)
    })

}).catch((err)=> console.error(`Mongodb connection error ${err}`))
