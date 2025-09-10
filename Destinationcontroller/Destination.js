const prisma=require('../Prismaclient/Prismaclient')

const Add=async(req,res)=>{
    try{
     const {account_id,url,method,headers}=req.body
     const data=await prisma.destination.create({
        data:{
            account_id,
            url,
            method,
            headers,
            created_by:req.user.id,
            updated_by:req.user.id
        }
     })
     res.json({message:"Destination created",data})
    }catch(error){
       res.json("check terminal")
       console.log("error",error)
    }
}
const Get=async  (req,res)=>{
    try{
    const data=await prisma.destination.findMany()
    res.json(data)
    }catch(error){
      res.json("check terminal")
      console.log("error",error)
    }
}
const DestinationId=async (req,res)=>{
    try{
     const {id}=req.params
     const data=await prisma.destination.findUnique({
        where:{id:Number(id)}
     })
     if(!data){
        return res.json("Not found id")
     }
     res.json(data)
    }catch(error){
      res.json("check terminal")
      console.log("error",error)
    }
}
const Update=async(req,res)=>{
    try{
    const {id}=req.params
    const {url,method,headers}=req.body
    const data=await prisma.destination.update({
        where:{id:parseInt(id)},
        data:{
            url,
            method,
            headers
        }
    })
    res.json({message:"Updated success",data})
    }catch(error){
      res.json("check terminal")
      console.log("error",error)
    }
}
const Delete=async(req,res)=>{
    try{
        const{id}=req.params
  await prisma.destination.delete({
     where:{id:parseInt(id)}
  })
  res.json("Deleted succesfully")
    }catch(error){
    res.json("check terminal")
    console.log("error",error)
    }
}
module.exports={Add,Get,DestinationId,Update,Delete}