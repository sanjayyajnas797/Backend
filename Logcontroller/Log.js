const prisma=require('../Prismaclient/Prismaclient')
const axios=require('axios')
const {v4: uuidv4}=require('uuid')

const Send=async (destination,data,event_id,account_id)=>{
    try{
     await axios({
      url:destination.url,
      method:destination.method,
      headers:destination.headers,
      data:data,
      timeout:5000
     })

     await prisma.log.create({
        data:{
            event_id,
            account_id,
            destination_id:destination.id,
            received_data:data,
            status:"success",
            processed_timestamp:new Date()
        }
     })
    }catch(error){
        console.log("error",error)

        await prisma.log.create({
            data:{
                event_id,
                account_id,
                destination_id:destination.id,
                received_data:data,
                status:"failed",
                processed_timestamp:new Date()
            }
        })
    }
}

const Incoming=async (req,res)=>{
    try{
    const token=req.headers['cl-x-token']
    const event_id=req.headers['cl-x-event_id'] || uuidv4()
    const data=req.body

    const account=await prisma.account.findUnique({
        where:{app_secret_token:token},
        include:{destinations:true}
    })
    if(!account){
        return res.json("Not matched")
    }
    for(let dest of account.destinations){
        await prisma.log.create({
            data:{
                event_id,
                account_id:account.id,
                destination_id:dest.id,
                received_data:data,
                status:"pending",
                received_timestamp:new Date()

            }
        })
    }

    account.destinations.forEach(dest=>{
        Send(dest,data,event_id,account.id)
    })
    res.json({success:true,message:"Data received"})
    }catch(error){
       res.json("check terminal")
       console.log("error",error)
    }
}
module.exports={Incoming}
