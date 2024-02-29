import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/**
 * cookieParser: to read cookies and  set cookies on clients browser.
 * middleware: read more about what is middleware as a interview question.
 */


const app = express()

/**
 * input: read about whitelisting
 * output: setting CORS middleware
 * 
*/ 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

/**
 * setting up middleware for receiving json data 
 * setting up limit for that json data
 * why? --> if no limit then clint can set any length of data and that might crash our server
 * this is best and standard practice
 * same setup we have done for receiving url data --> should it allow extended/nested data and the limit  
 * and the third one is to mention location where i want to store my static files that i will receive from client
 */

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())

export {app}