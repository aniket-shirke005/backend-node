/**
 * why we need this utility?
 * we have try catch syntax almost everywhere where we are using asyncronous code
 * so why dont we make a wrapper that will work as utility for others 
 * below you will find two diferent code syntax but same approach 1. promises 2. trycatch
 */


const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}

// const asyncHandler = (func)=> async (req,res,next)=>{
//     try {
//         await func(req,res,next) 
//     } catch (error) {
//         res.status(error?.code || 500).json({
//             success: false,
//             message: error?.message
//         })
//     }    
// }

export {asyncHandler}