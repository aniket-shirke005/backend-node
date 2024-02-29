import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String, //get from cloudinary
            required:true,
        },
        coverImage:{
            type:String, //get from cloudinary
        },
        watchHistory:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Video'
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required."]
        },
        refreshToken:{
            type:String,
        }
    }
,{timestamps:true})

/**
 * userSchema.pre: This is called hook 
 * this will work before saving data to database 
 * extra detail here is : whenever we save data or change any datapoint in this model this hook will run 
 * and the logic written in this hook will run, 
 * we dont want to unnecesarily encrypt password again and again 
 * so we write if password is modified/changed then only encrypt it.    
 */

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

/**
 * here you can see we have created our own method on userSchema 
 * when we import User model we get this method on User model where we are passing plain password as parameter
 *   
 */

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

/**
 * generating access and refresh tokens using jwt.sign method 
 */

userSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username: this.username,
            fullname: this.fullname,
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id:this._id,
        },
            process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema) 