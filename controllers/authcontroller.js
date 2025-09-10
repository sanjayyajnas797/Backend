const prisma=require('../Prismaclient/Prismaclient')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const JWT_SECRET=process.env.JWT_SECRET || 'sanjay'

const Register=async (req,res)=>{
    try{
     const {email,password,role}=req.body
     const hashed=await bcrypt.hash(password,10)

     const user=await prisma.User.create({
        data:{
            email,
            password:hashed,
            role:role||'user',
            created_by:0,
            updated_by:0
        }
     })
     res.json({message:"Registerd success",user})
    }catch(error){
        res.status(500).json({message:"Signup failed"})
        console.log("error",error)
    }
}
const Login=async (req,res)=>{
    try{
      const {email,password}=req.body
      const user=await prisma.User.findUnique({
        where:{email}
      })
      if(!user){
        return res.json("Not found the email")
      }
      const match=await bcrypt.compare(password,user.password)
      if(!match){
        return res.json("Not match password")
      }
      const token=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:"1d"})
      res.json(token)
    }catch(error){
        res.json("error throw")
       console.log("error",error)
    }
}
module.exports={Register,Login}