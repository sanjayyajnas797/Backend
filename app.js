const express=require('express')

const app=express()

const port=5000
app.use(express.json())

const dotenv=require('dotenv')
dotenv.config()

const authroute=require('../Accounts management/authrouter/Router')
app.use('/api',authroute)

const Accountroute=require('../Accounts management/Accountcontroller/accountroute')
app.use('/api',Accountroute)

const Memberroute=require('../Accounts management/Accountmember/Accountmemberrouter')
app.use('/api',Memberroute)

const Rolerouter=require('../Accounts management/Rolecreate/Roleroute')
app.use('/api',Rolerouter)

const Destinationroute=require('../Accounts management/Destinationcontroller/Destinitionrouteer')
app.use('/api',Destinationroute)

const Logroute=require('../Accounts management/Logcontroller/Logrouter')
app.use('/api',Logroute)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})