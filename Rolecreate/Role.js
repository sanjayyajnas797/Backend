const prisma=require('../Prismaclient/Prismaclient')

const Createrole=async (req,res)=>{
    try{
    const {role_name}=req.body
    const data=await prisma.role.create({
        data:{
            role_name
        }
    })
    res.json({message:"Role created success",data})
    }catch(error){
      res.json("check terminal")
      console.log("error",error)
    }
}
const Getrole=async (req,res)=>{
    try{
   const data=await prisma.role.findMany()
   res.json(data)
    }catch(error){
       res.json("check terminal")
       console.log("error",error)
    }
}
const Getbyid=async(req,res)=>{
    try{
     const {id}=req.params
     const data=await prisma.role.findUnique({
        where:{id:Number(id)}
     })
     if(!data){
        return res.json("Not id found")
     }
     res.json(data)
    }catch(error){
        res.json("check terminal")
        console.log("error",error)
    }
}
const UpdateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role_name } = req.body
    const role = await prisma.Role.update({
      where: { id: Number(id) },
      data: { role_name }
    })
    res.json({ message: "Role updated successfully", role })
  } catch (error) {
    console.log("error", error)
    res.json({ error: "Failed to update role" })
  }
}
const Delete=async(req,res)=>{
    try{
     const {id}=req.params
     const data=await prisma.role.delete({
        where:{id:Number(id)}

     })
     res.json({message:"Deleted success",data})
    }catch(error){
       res.json("check terminal")
       console.log("error",error)
    }
}
module.exports={Createrole,Getrole,Getbyid,Delete,UpdateRole}
