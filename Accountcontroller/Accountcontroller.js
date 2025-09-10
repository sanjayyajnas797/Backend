const prisma=require('../Prismaclient/Prismaclient')

const {v4: uuidv4}=require('uuid')

const Createaccount=async (req,res)=>{
    try{
     const {account_name,website,created_by,updated_by,}=req.body
     const data=await prisma.Account.create({
        data:{
            account_name,
            app_secret_token:uuidv4(),
            website,
            created_by,
            updated_by
        }
     })
      res.json({ message: "Created success", data }) 
    }catch(error){
      res.json("error throw")
      console.log("error",error)
    }
}
const Getdata=async (req,res)=>{
  try{
  if(req.user.role==="admin"){
    const data=await  prisma.account.findMany()
    return res.json(data)
  }else{
    const data=await prisma.account.findMany({
      where:{
        members:{
          some:{user_id:req.user.id}
        }
      },
      include:{members:true}
    })
    return res.json(data)
  }
  }catch(error){
        res.json("check terminal")
        console.log("error",error)
  }
}

const GetdataId=async(req,res)=>{
  try{
    const {id}=req.params
    const data=await prisma.Account.findUnique({
      where:{id:parseInt(id)}
    })
    if(!data){
      return res.json("Not found")
    }
    res.json(data)
  }catch(error){
     console.log("error",error)
  }
}
const Update=async (req,res)=>{
  try{
     const {id}=req.params
     const {account_name,website,updated_by}=req.body
     const data=await prisma.Account.update({
      where:{id:parseInt(id)},
      data:{
        account_name,
        website,
        updated_by
      }
     })
     res.json({message:"Updated success",data})
  }catch(error){
      res.json("updated error checkin console")
      console.log("error",error)
  }
}
const Delete=async (req,res)=>{
  try{
    const {id}=req.params
    const data=await prisma.Account.delete({
      where:{id:parseInt(id)}
    })
    res.json({message:"deleted success",data})
  }catch(error){
       res.json("error check terminal")
       console.log("error",error)
  }
}
module.exports={Createaccount,Getdata,GetdataId,Update,Delete}