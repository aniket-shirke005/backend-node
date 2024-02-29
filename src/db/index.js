import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB(){
    try {
        const databaseInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongodb connected !! DB HOST: ${databaseInstance.connection.host}`)
    } catch (error) {
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.error("Database connection error: ", error)
        process.exit(1)
    }
} 

export default connectDB;