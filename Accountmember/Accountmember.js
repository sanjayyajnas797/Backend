const prisma=require('../Prismaclient/Prismaclient')

const Addmember=async  (req,res)=>{
    try{
    const {account_id,user_id,role_id}=req.body
    const member=await prisma.AccountMember.create({
        data:{
            account_id:Number(account_id),
            user_id:Number(user_id),
            role_id:Number(role_id)
        },
        include:{
            user:true,
            role:true
        }
    })
    res.json({message:"Member added success",member})
    }catch(error){
    res.json("error check terminal")
    console.log("error",error)
    }
}

const Get=async(req,res)=>{
    try{
     const data=await prisma.AccountMember.findMany()
     res.json(data)
    }catch(error){
        res.json("check terminal")
        console.log("error",error)
    }
}


const Update=async (req,res)=>{
    try{
    const {id}=req.params
    const {role_id}=req.body
    const data=await prisma.AccountMember.update({
        where:{id:Number(id)},
        data:{
            role_id
        },
        include:{role:true}
    })
    res.json({message:"Updated success",data})
    }catch(error){
    res.json("check terminal")
    console.log("error",error)
    }
}
const Delete=async (req,res)=>{

    try{
     const {id}=req.params
     const data=await prisma.AccountMember.delete({
        where:{id:parseInt(id)}
     })
     res.json({message:"Deleted success",data})
    }catch(error){

        res.json("error check in terminal")
        console.log("error",error)
    }
}
module.exports={Addmember,Get,Update,Delete}